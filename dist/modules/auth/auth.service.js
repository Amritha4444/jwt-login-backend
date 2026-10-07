"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
exports.signupUser = signupUser;
const auth_repository_1 = require("./auth.repository");
const password_1 = require("../../utils/password");
const jwt_1 = require("../../utils/jwt");
async function loginUser(email, password) {
    const user = await (0, auth_repository_1.findUserByEmail)(email);
    if (!user) {
        throw new Error('INVALID_CREDENTIALS');
    }
    const validPassword = await (0, password_1.verifyPassword)(password, user.password);
    if (!validPassword) {
        throw new Error('INVALID_CREDENTIALS');
    }
    const token = (0, jwt_1.generateToken)({
        id: user.id,
        email: user.email
    });
    return {
        token,
        user: {
            id: user.id,
            email: user.email
        }
    };
}
async function signupUser(email, password) {
    const existingUser = await (0, auth_repository_1.findUserByEmail)(email);
    if (existingUser) {
        throw new Error('EMAIL_EXISTS');
    }
    const hashedPassword = await (0, password_1.hashPassword)(password);
    return (0, auth_repository_1.createUser)(email, hashedPassword);
}
//# sourceMappingURL=auth.service.js.map