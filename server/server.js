const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'nongra_super_secret_municipal_key_2026';

app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// Multer storage for uploaded evidence
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`)
});
const upload = multer({ storage });

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
      if (err.message.includes('UNIQUE constraint failed')) {
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

// Current User Profile & Report History
app.get('/api/auth/me', authenticateToken, (req, res) => {
  db.get('SELECT id, name, email, role, squad_name, points, created_at FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });

    db.all('SELECT * FROM reports WHERE reporter_id = ? ORDER BY id DESC', [user.id], (err2, reports) => {
      res.json({ user, myReports: reports || [] });
    });
  });
});

// ==========================================
// 2. REPORTS ENDPOINTS (GUESTS & CITIZENS)
// ==========================================

// Fetch all reports for the map & activity list
app.get('/api/reports', (req, res) => {
  db.all('SELECT * FROM reports ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Ingest hazard report (Works for both guests and authenticated citizens)
app.post('/api/reports', upload.single('image'), (req, res) => {
  const { latitude, longitude, description } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  const tracking_code = `NG-${Math.floor(1000 + Math.random() * 9000)}`;

  let reporter_id = null;
  let reporter_name = 'Anonymous Citizen';

  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.split(' ')[1]) {
    try {
      const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
      reporter_id = decoded.id;
      reporter_name = decoded.name;
    } catch (e) {
      // Keep as guest if token is missing or invalid
    }
  }

  const sql = `
    INSERT INTO reports (tracking_code, reporter_id, reporter_name, latitude, longitude, description, image_url, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'reported')
  `;

  db.run(sql, [tracking_code, reporter_id, reporter_name, latitude, longitude, description, image_url], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    // Reward citizen points if registered
    if (reporter_id) {
      db.run('UPDATE users SET points = points + 20 WHERE id = ?', [reporter_id]);
    }

    // Ingest into Audit Ledger
    db.run(
      `INSERT INTO audit_logs (report_id, action, actor_name, actor_role, details) 
       VALUES (?, 'Incident Telemetry Ingested', ?, ?, ?)`,
      [this.lastID, reporter_name, reporter_id ? 'Citizen' : 'Guest Citizen', description]
    );

    res.json({
      success: true,
      reportId: this.lastID,
      tracking_code,
      message: 'Hazard submitted successfully.'
    });
  });
});

// Legacy claim endpoint (for compatibility with existing UI)
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

// Legacy resolve endpoint (for compatibility with existing UI)
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

// ==========================================
// 3. AUTHENTICATED VOLUNTEER SQUAD APIS
// ==========================================

// Volunteer claim endpoint with JWT verification
app.patch('/api/volunteer/claim/:id', authenticateToken, (req, res) => {
  const reportId = req.params.id;
  const squadUser = req.user;

  if (squadUser.role !== 'volunteer' && squadUser.role !== 'admin') {
    return res.status(403).json({ error: 'Only authorized field squads can claim tasks' });
  }

  const squadName = squadUser.squad_name || squadUser.name;

  db.run(
    `UPDATE reports 
     SET status = 'claimed', claimed_by = ?, claimed_squad = ?, claimed_at = CURRENT_TIMESTAMP 
     WHERE id = ? AND status = 'reported'`,
    [squadUser.id, squadName, reportId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(400).json({ error: 'Task already claimed or not found' });

      db.run(
        `INSERT INTO audit_logs (report_id, action, actor_name, actor_role, details) 
         VALUES (?, 'Dispatch Locked by Squad', ?, 'Volunteer Squad', ?)`,
        [reportId, squadUser.name, `Assigned to ${squadName}`]
      );

      res.json({ success: true, message: `Task #${reportId} claimed by ${squadName}` });
    }
  );
});

// Volunteer resolve endpoint with proof upload & intervention
app.post('/api/volunteer/resolve/:id', authenticateToken, upload.single('resolved_image'), (req, res) => {
  const reportId = req.params.id;
  const squadUser = req.user;
  const { intervention = 'Biological Bti Application' } = req.body;
  const resolved_image_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (squadUser.role !== 'volunteer' && squadUser.role !== 'admin') {
    return res.status(403).json({ error: 'Only authorized volunteers can submit resolution proof' });
  }

  db.run(
    `UPDATE reports 
     SET status = 'resolved', resolved_image_url = ?, intervention = ?, resolved_at = CURRENT_TIMESTAMP 
     WHERE id = ?`,
    [resolved_image_url, intervention, reportId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      db.run('UPDATE users SET points = points + 50 WHERE id = ?', [squadUser.id]);

      db.run(
        `INSERT INTO audit_logs (report_id, action, actor_name, actor_role, details) 
         VALUES (?, 'Sanitary Vector Neutralization', ?, 'Volunteer Squad', ?)`,
        [reportId, squadUser.name, `Applied: ${intervention}`]
      );

      res.json({ success: true, message: 'Hotspot resolved and signed off.' });
    }
  );
});

// Leaderboard
app.get('/api/users/leaderboard', (req, res) => {
  db.all('SELECT id, name as username, squad_name, role, points FROM users ORDER BY points DESC LIMIT 10', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Nongra Municipal Server online at http://localhost:${PORT}`);
});