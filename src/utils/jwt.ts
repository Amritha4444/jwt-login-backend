import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function generateToken(payload: object): string {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn']
  });
}

export function verifyToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, env.jwtSecret) as jwt.JwtPayload;
}