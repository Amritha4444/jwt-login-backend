import { Request, Response } from 'express';
import { loginUser, signupUser } from './auth.service';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        data: null
      });
    }

    const data = await loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data
    });
  } catch (error: any) {
    if (error.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        data: null
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null
    });
  }
}

export async function signup(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        data: null
      });
    }

    const data = await signupUser(email, password);

    return res.status(201).json({
      success: true,
      message: 'Signup successful',
      data
    });
  } catch (error: any) {
    if (error.message === 'EMAIL_EXISTS') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
        data: null
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null
    });
  }
}
export function getMe(req: any, res: Response): Response {
  return res.status(200).json({
    success: true,
    message: 'User details retrieved successfully',
    data: {
      user: req.user
    }
  });
}