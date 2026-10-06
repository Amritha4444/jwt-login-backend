const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const db = require('./database');

const app = express();
const PORT = 3000;

const SECRET_KEY = process.env.JWT_SECRET;

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

    // Find user by email only
    const sql = 'SELECT * FROM users WHERE email = ?';

    db.get(sql, [email], async (err, user) => {
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

        // Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
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
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';

        db.run(sql, [email, hashedPassword], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(409).json({
                        message: 'Email already exists'
                    });
                }

                return res.status(500).json({
                    message: 'Database error'
                });
            }

            res.status(201).json({
                message: 'Signup successful'
            });
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

// JWT MIDDLEWARE
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Access denied'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};

// PROTECTED DASHBOARD
app.get('/api/dashboard', verifyToken, (req, res) => {
    res.json({
        message: 'Welcome to the dashboard',
        user: req.user
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});