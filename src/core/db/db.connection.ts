import * as sqlite3 from 'sqlite3';
import { hashPassword } from '../../utils/password';
import { env } from '../../config/env';

const db = new sqlite3.Database(env.databasePath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }

  console.log('Connected to SQLite database.');
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
        return;
      }

      db.all(
        'PRAGMA table_info(users)',
        (infoErr, columns: { name: string }[]) => {
          if (infoErr) {
            console.error('Error checking users table:', infoErr.message);
            return;
          }

          const names = columns.map((column) => column.name);

          const migratePassword = () => {
  if (!names.includes('password')) {
    createDemoUser();
    return;
  }

  db.run(
    `UPDATE users SET password_hash = password
     WHERE password_hash IS NULL AND password IS NOT NULL`,
    (migrationErr) => {
      if (migrationErr) {
        console.error(
          'Error migrating password hashes:',
          migrationErr.message
        );
        return;
      }

      createDemoUser();
    }
  );
};

          const addUpdatedAt = () => {
            if (names.includes('updated_at')) {
              migratePassword();
              return;
            }

            db.run(
              `ALTER TABLE users ADD COLUMN updated_at TEXT`,
              (alterErr) => {
                if (alterErr) {
                  console.error('Error adding updated_at:', alterErr.message);
                  return;
                }
                migratePassword();
              }
            );
          };

          const addCreatedAt = () => {
            if (names.includes('created_at')) {
              addUpdatedAt();
              return;
            }

            db.run(
              `ALTER TABLE users ADD COLUMN created_at TEXT`,
              (alterErr) => {
                if (alterErr) {
                  console.error('Error adding created_at:', alterErr.message);
                  return;
                }
                addUpdatedAt();
              }
            );
          };

          const addPasswordHash = () => {
            if (names.includes('password_hash')) {
              addCreatedAt();
              return;
            }

            db.run(
              `ALTER TABLE users ADD COLUMN password_hash TEXT`,
              (alterErr) => {
                if (alterErr) {
                  console.error('Error adding password_hash:', alterErr.message);
                  return;
                }
                addCreatedAt();
              }
            );
          };

          addPasswordHash();
        }
      );
    }
  );
});

function createDemoUser() {
  db.run(
    `UPDATE users SET created_at = CURRENT_TIMESTAMP
     WHERE created_at IS NULL`
  );

  db.run(
    `UPDATE users SET updated_at = CURRENT_TIMESTAMP
     WHERE updated_at IS NULL`
  );

  console.log('Users table ready.');

  const demoEmail = 'demo@gmail.com';
  const demoPassword = 'demo123';

  hashPassword(demoPassword)
    .then((hashedPassword) => {
      db.run(
        `INSERT OR IGNORE INTO users
         (email, password_hash) VALUES (?, ?)`,
        [demoEmail, hashedPassword],
        (insertError) => {
          if (insertError) {
            console.error('Error creating demo user:', insertError.message);
          } else {
            console.log('Demo user ready.');
          }
        }
      );
    })
    .catch((error: unknown) => {
      console.error('Error hashing demo password:', error);
    });
}

export default db;