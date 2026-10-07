"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../utils/jwt");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. Token required.',
            data: null
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = {
            id: Number(decoded.id),
            email: String(decoded.email)
        };
        next();
    }
    catch {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.',
            data: null
        });
    }
}
//# sourceMappingURL=auth.middleware.js.map