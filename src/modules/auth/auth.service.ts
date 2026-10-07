import {
  findUserByEmail,
  createUser
} from './auth.repository';

import {
  hashPassword,
  verifyPassword
} from '../../utils/password';

import { generateToken } from '../../utils/jwt';


export async function loginUser(
  email: string,
  password: string
) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const validPassword = await verifyPassword(
    password,
    user.password
  );

  if (!validPassword) {
    throw new Error('INVALID_CREDENTIALS');
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
    throw new Error('EMAIL_EXISTS');
  }

  const hashedPassword = await hashPassword(password);

  return createUser(email, hashedPassword);
}