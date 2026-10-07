"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.signup = signup;
exports.getMe = getMe;
const auth_service_1 = require("./auth.service");
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
                data: null
            });
        }
        const data = await (0, auth_service_1.loginUser)(email, password);
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data
        });
    }
    catch (error) {
        if (error.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
                data: null
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
}
async function signup(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
                data: null
            });
        }
        const data = await (0, auth_service_1.signupUser)(email, password);
        return res.status(201).json({
            success: true,
            message: 'Signup successful',
            data
        });
    }
    catch (error) {
        if (error.message === 'EMAIL_EXISTS') {
            return res.status(409).json({
                success: false,
                message: 'Email already exists',
                data: null
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
}
function getMe(req, res) {
    return res.status(200).json({
        success: true,
        message: 'User details retrieved successfully',
        data: {
            user: req.user
        }
    });
}
//# sourceMappingURL=auth.controller.js.map