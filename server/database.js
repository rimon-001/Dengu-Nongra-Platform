const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'nongra.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to SQLite database', err);
  } else {
    console.log('Connected to persistent SQLite database at:', dbPath);
  }
});

db.serialize(() => {
  // 1. Enable WAL mode for high concurrency
  db.run('PRAGMA journal_mode = WAL;');

  // 2. Users Table (Citizens & Volunteer Squads)
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT CHECK(role IN ('citizen', 'volunteer', 'admin')) NOT NULL DEFAULT 'citizen',
      squad_name TEXT,
      points INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 3. Reports Table (Supports anonymous guests and logged-in citizens)
  db.run(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tracking_code TEXT UNIQUE NOT NULL,
      reporter_id INTEGER,
      reporter_name TEXT DEFAULT 'Anonymous Citizen',
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT,
      status TEXT CHECK(status IN ('reported', 'claimed', 'resolved')) NOT NULL DEFAULT 'reported',
      claimed_by INTEGER,
      claimed_squad TEXT,
      claimed_at DATETIME,
      resolved_image_url TEXT,
      intervention TEXT,
      resolved_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (reporter_id) REFERENCES users(id),
      FOREIGN KEY (claimed_by) REFERENCES users(id)
    )
  `);

  // 4. Audit Log Table
  db.run(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      report_id INTEGER,
      action TEXT NOT NULL,
      actor_name TEXT NOT NULL,
      actor_role TEXT NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed default demo accounts if not exist
  const salt = bcrypt.genSaltSync(10);
  const defaultPass = bcrypt.hashSync('password123', salt);

  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (!err && row.count === 0) {
      console.log('Seeding initial demo accounts...');
      
      // Seed Citizen
      db.run(
        `INSERT INTO users (name, email, password_hash, role, points) 
         VALUES ('Tanvir Hossain', 'citizen@nongra.org', ?, 'citizen', 120)`,
        [defaultPass]
      );

      // Seed Volunteer Squad
      db.run(
        `INSERT INTO users (name, email, password_hash, role, squad_name, points) 
         VALUES ('Squad Commander Rahim', 'volunteer@nongra.org', ?, 'volunteer', 'Ashulia Rapid Squad Alpha', 450)`,
        [defaultPass]
      );

      // Seed Sample Hazards
      db.run(`
        INSERT INTO reports (tracking_code, reporter_name, latitude, longitude, description, status, image_url)
        VALUES 
        ('NG-8812', 'Campus Resident', 23.8768, 90.3201, 'Stagnant rain puddle behind cafeteria block', 'reported', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80'),
        ('NG-8813', 'Anonymous Citizen', 23.8795, 90.3225, 'Discarded plastic bottles accumulating larvae near Gate 1', 'reported', 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=400&q=80'),
        ('NG-8814', 'Hostel Warden', 23.8725, 90.3230, 'Clogged municipal drainage conduit beside bus terminal', 'claimed', 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=400&q=80')
      `);
      console.log('Demo accounts seeded! (Passwords: password123)');
    }
  });
});

module.exports = db;