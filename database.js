const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

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
`, async (err) => {
    if (err) {
        console.error('Error creating users table:', err.message);
        return;
    }

    console.log('Users table ready.');

    // Create demo user with hashed password
    const demoEmail = 'demo@gmail.com';
    const demoPassword = 'demo123';

    try {
        const hashedPassword = await bcrypt.hash(demoPassword, 10);

        db.run(
            'INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)',
            [demoEmail, hashedPassword],
            (err) => {
                if (err) {
                    console.error('Error creating demo user:', err.message);
                } else {
                    console.log('Demo user ready.');
                }
            }
        );
    } catch (error) {
        console.error('Error hashing demo password:', error.message);
    }
});

module.exports = db;