const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Table creation failed:', err.message);
    } else {
        console.log('Users table ready.');
    }
});

db.run(`
    INSERT OR IGNORE INTO users (email, password)
    VALUES ('test@example.com', '123456')
`, (err) => {
    if (err) {
        console.error('Demo user creation failed:', err.message);
    } else {
        console.log('Demo user ready.');
    }
});

module.exports = db;