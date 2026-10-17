import {
  findUserByEmail,
  createUser
} from './auth.repository';

import {
  hashPassword,
  verifyPassword
} from '../../utils/password';

import { generateToken } from '../../utils/jwt';

import {
  UnauthorizedError,
  ConflictError
} from '../../core/errors/http.error';

export async function loginUser(
  email: string,
  password: string
) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const validPassword = await verifyPassword(
    password,
    user.password_hash
  );

  if (!validPassword) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const token = generateToken({
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

export async function signupUser(
  email: string,
  password: string
) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ConflictError('Email already exists');
  }

  const hashedPassword = await hashPassword(password);

  return createUser(email, hashedPassword);
}