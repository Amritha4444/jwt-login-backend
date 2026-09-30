const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const SECRET_KEY = "mysecretkey";

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid or expired token."
            });
        }

        req.user = user;
        next();
    });
};

// Login API
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, user) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (!user) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            const token = jwt.sign(
                { email: user.email },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            res.json({
                message: "Login successful",
                token: token
            });
        }
    );
});

// Protected Dashboard API
app.get("/api/dashboard", authenticateToken, (req, res) => {
    res.json({
        message: "Welcome to the dashboard",
        user: req.user
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});