import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret && nodeEnv !== 'test') {
  throw new Error('JWT_SECRET is missing in .env');
}

export const env = {
  nodeEnv,
  port: Number(process.env.PORT) || 3000,
  jwtSecret: jwtSecret || 'test_only_secret_for_automated_tests',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  allowedOrigins:
    process.env.ALLOWED_ORIGINS || 'http://localhost:4200',
 databasePath:
  process.env.NODE_ENV === 'test'
    ? ':memory:'
    : process.env.DATABASE_PATH || './users.db'
};