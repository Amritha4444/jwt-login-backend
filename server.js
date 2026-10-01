const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const PORT = 3000;

const SECRET_KEY = 'mysecretkey';

app.use(cors());
app.use(express.json());

// LOGIN
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.get(sql, [email, password], (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Database error'
            });
        }

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            SECRET_KEY,
            {
                expiresIn: '1h'
            }
        );

        res.json({
            message: 'Login successful',
            token: token
        });
    });
});

// SIGNUP
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});