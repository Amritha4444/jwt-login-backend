const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create users table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Error creating users table:', err.message);
        return;
    }

    console.log('Users table ready.');

    // Create demo user if it doesn't already exist
    const demoEmail = 'demo@gmail.com';
    const demoPassword = 'demo123';

    db.run(
        'INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)',
        [demoEmail, demoPassword],
        (err) => {
            if (err) {
                console.error('Error creating demo user:', err.message);
            } else {
                console.log('Demo user ready.');
            }
        }
    );
});

module.exports = db;