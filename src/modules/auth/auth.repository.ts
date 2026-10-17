import db from '../../core/db/db.connection';
import { User } from './user.model';

export function findUserByEmail(
  email: string
): Promise<User | undefined> {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err: Error | null, row: User | undefined) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(row);
      }
    );
  });
}

export function findUserById(
  id: number
): Promise<User | undefined> {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE id = ?',
      [id],
      (err: Error | null, row: User | undefined) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(row);
      }
    );
  });
}

export function createUser(
  email: string,
  passwordHash: string
): Promise<{ id: number; email: string }> {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)',
      [email, passwordHash],
      function (this: { lastID: number }, err: Error | null) {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          id: this.lastID,
          email
        });
      }
    );
  });
}