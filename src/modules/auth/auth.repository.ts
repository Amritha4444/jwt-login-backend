const db = require('../../../database');

export function findUserByEmail(email: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err: Error | null, row: any) => {
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
  password: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, password],
      function (this: any, err: Error | null) {
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