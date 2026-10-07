"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.createUser = createUser;
const db = require('../../../database');
function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    });
}
function createUser(email, password) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                id: this.lastID,
                email
            });
        });
    });
}
//# sourceMappingURL=auth.repository.js.map