const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'nongra_super_secret_municipal_key_2026';

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploads static assets cleanly
app.use('/uploads', express.static(uploadDir));

// Multer storage for uploaded evidence
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`)
});
const upload = multer({ storage });

// Helper to compute state hash
const generateSHA256Hash = (payload) => {
  return '0x' + crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex').substring(0, 16);
};

// Safe audit logging helper: will NEVER crash the server on SQL constraint errors
const safeLogAudit = (reportId, action, actorName, actorRole, details, stateHash) => {
  db.run(
    `INSERT INTO audit_logs (report_id, action, actor_name, actor_role, details, state_hash) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [reportId || 0, action, actorName || 'System', actorRole || 'System', details || '', stateHash || '0x00000000'],
    (err) => {
      if (err) {
        // Fallback without state_hash column if column hasn't migrated yet
        db.run(
          `INSERT INTO audit_logs (report_id, action, actor_name, actor_role, details) 
           VALUES (?, ?, ?, ?, ?)`,
          [reportId || 0, action, actorName || 'System', actorRole || 'System', details || ''],
          () => {}
        );
      }
    }
  );
};

// Helper Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// ==========================================
// 1. AUTHENTICATION ENDPOINTS
// ==========================================

// Register Citizen or Volunteer Squad
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role = 'citizen', squad_name } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = `INSERT INTO users (name, email, password_hash, role, squad_name) VALUES (?, ?, ?, ?, ?)`;

  db.run(sql, [name, email, hashedPassword, role, squad_name || null], function (err) {
    if (err) {
      if (err.message && err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      return res.status(500).json({ error: err.message });
    }

    const token = jwt.sign({ id: this.lastID, name, email, role, squad_name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: this.lastID, name, email, role, squad_name, points: 0 } });
  });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const validPass = bcrypt.compareSync(password, user.password_hash);
    if (!validPass) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role, squad_name: user.squad_name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        squad_name: user.squad_name,
        points: user.points
      }
    });
  });
});

// Current User Profile
app.get('/api/auth/me', authenticateToken, (req, res) => {
  db.get('SELECT id, name, email, role, squad_name, points, created_at FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });

    db.all('SELECT * FROM reports WHERE reporter_id = ? ORDER BY id DESC', [user.id], (err2, reports) => {
      res.json({ user, myReports: reports || [] });
    });
  });
});

// ==========================================
// 2. REPORTS INGESTION & QUERIES
// ==========================================

// Fetch all reports
app.get('/api/reports', (req, res) => {
  db.all('SELECT * FROM reports ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

// Ingest hazard report
app.post('/api/reports', upload.single('image'), (req, res) => {
  const body = req.body || {};
  const lat = parseFloat(body.latitude) || 23.8769;
  const lng = parseFloat(body.longitude) || 90.3241;

  let description = body.description;
  if (!description) {
    const hazard = body.hazard_type || 'Breeding Hazard';
    const landmark = body.landmark || body.location_details || '';
    description = landmark ? `${hazard} - ${landmark}` : hazard;
  }

  let image_url = null;
  if (req.file) {
    image_url = `/uploads/${req.file.filename}`;
  } else if (body.image_url) {
    image_url = body.image_url;
  } else {
    image_url = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80';
  }

  const tracking_code = `NG-${Math.floor(1000 + Math.random() * 9000)}`;
  let reporter_id = null;
  let reporter_name = 'Anonymous Citizen';

  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.split(' ')[1]) {
    try {
      const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
      reporter_id = decoded.id;
      reporter_name = decoded.name;
    } catch (e) {}
  }

  const sql = `
    INSERT INTO reports (tracking_code, reporter_id, reporter_name, latitude, longitude, description, image_url, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'reported')
  `;

  db.run(sql, [tracking_code, reporter_id, reporter_name, lat, lng, description, image_url], function (err) {
    if (err) {
      console.error('Database report insert error:', err);
      return res.status(500).json({ error: err.message });
    }

    const reportId = this.lastID;
    const stateHash = generateSHA256Hash({ reportId, tracking_code, lat, lng, timestamp: Date.now() });

    if (reporter_id) {
      db.run('UPDATE users SET points = points + 20 WHERE id = ?', [reporter_id]);
    }

    safeLogAudit(reportId, 'Incident Telemetry Ingested', reporter_name, reporter_id ? 'Citizen' : 'Guest Citizen', description, stateHash);

    const createdReport = {
      id: reportId,
      tracking_code,
      reporter_id,
      reporter_name,
      latitude: lat,
      longitude: lng,
      description,
      image_url,
      status: 'reported',
      created_at: new Date().toISOString()
    };

    res.json({
      success: true,
      report: createdReport,
      reportId,
      tracking_code,
      message: 'Hazard submitted successfully.'
    });
  });
});

// Edit report
app.put('/api/reports/:id', (req, res) => {
  const reportId = req.params.id;
  const { description, latitude, longitude, status } = req.body;

  let actorName = 'Volunteer Squad';
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.split(' ')[1]) {
    try {
      const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
      actorName = decoded.name || actorName;
    } catch (e) {}
  }

  const sql = `
    UPDATE reports 
    SET description = COALESCE(?, description),
        latitude = COALESCE(?, latitude),
        longitude = COALESCE(?, longitude),
        status = COALESCE(?, status)
    WHERE id = ?
  `;

  db.run(sql, [description, latitude, longitude, status, reportId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    safeLogAudit(reportId, 'Hazard Updated', actorName, 'Volunteer Squad', `Updated: ${description || 'Metadata update'}`);
    res.json({ success: true, message: `Report #${reportId} successfully updated.` });
  });
});

// Delete report
app.delete('/api/reports/:id', (req, res) => {
  const reportId = req.params.id;
  let actorName = 'Volunteer Squad';
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.split(' ')[1]) {
    try {
      const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
      actorName = decoded.name || actorName;
    } catch (e) {}
  }

  db.run('DELETE FROM reports WHERE id = ?', [reportId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    safeLogAudit(reportId, 'Hazard Deleted', actorName, 'Volunteer Squad', `Deleted report #${reportId}`);
    res.json({ success: true, message: `Report #${reportId} successfully deleted.` });
  });
});

// Legacy claim endpoint
app.patch('/api/reports/:id/claim', (req, res) => {
  const reportId = req.params.id;
  const userId = req.body.userId || 1;

  db.run(
    `UPDATE reports SET status = 'claimed', claimed_by = ?, claimed_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [userId, reportId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: 'Task claimed' });
    }
  );
});

// Legacy resolve endpoint
app.post('/api/reports/:id/resolve', upload.single('resolved_image'), (req, res) => {
  const reportId = req.params.id;
  const { intervention = 'Physical Water Evacuation' } = req.body;
  const resolved_image_url = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(
    `UPDATE reports SET status = 'resolved', resolved_image_url = ?, intervention = ?, resolved_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [resolved_image_url, intervention, reportId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: 'Task resolved' });
    }
  );
});

// Volunteer squad claim
app.patch('/api/volunteer/claim/:id', (req, res) => {
  const reportId = req.params.id;
  let squadId = 1;
  let squadName = 'Alpha Rapid Response';

  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.split(' ')[1]) {
    try {
      const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
      squadId = decoded.id;
      squadName = decoded.squad_name || decoded.name;
    } catch (e) {}
  }

  db.run(
    `UPDATE reports 
     SET status = 'claimed', claimed_by = ?, claimed_squad = ?, claimed_at = CURRENT_TIMESTAMP 
     WHERE id = ?`,
    [squadId, squadName, reportId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: `Task #${reportId} claimed by ${squadName}` });
    }
  );
});

// Volunteer squad resolve
app.post('/api/volunteer/resolve/:id', upload.single('resolved_image'), (req, res) => {
  const reportId = req.params.id;
  const { intervention = 'Biological Bti Application' } = req.body;
  const resolved_image_url = req.file ? `/uploads/${req.file.filename}` : null;

  let squadId = 1;
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.split(' ')[1]) {
    try {
      const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
      squadId = decoded.id;
    } catch (e) {}
  }

  db.run(
    `UPDATE reports 
     SET status = 'resolved', resolved_image_url = ?, intervention = ?, resolved_at = CURRENT_TIMESTAMP 
     WHERE id = ?`,
    [resolved_image_url, intervention, reportId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.run('UPDATE users SET points = points + 50 WHERE id = ?', [squadId]);
      res.json({ success: true, message: 'Hotspot resolved and signed off.' });
    }
  );
});

// User rewards
app.post('/api/users/reward', (req, res) => {
  const { userId, points } = req.body;
  if (!userId || !points) {
    return res.status(400).json({ error: 'User ID and points are required' });
  }

  const sql = `UPDATE users SET points = points + ? WHERE id = ?`;
  db.run(sql, [points, userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'User not found' });

    db.get('SELECT id, name, email, role, squad_name, points FROM users WHERE id = ?', [userId], (err2, user) => {
      if (err2 || !user) return res.status(500).json({ error: 'Could not fetch user profile' });
      res.json({ success: true, user, message: `Successfully credited +${points} points!` });
    });
  });
});

// Leaderboard
app.get('/api/users/leaderboard', (req, res) => {
  db.all('SELECT id, name as username, squad_name, role, points FROM users ORDER BY points DESC LIMIT 10', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

// Audit logs
app.get('/api/audit', (req, res) => {
  db.all('SELECT * FROM audit_logs ORDER BY id DESC LIMIT 50', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Nongra Municipal Server online at http://localhost:${PORT}`);
});