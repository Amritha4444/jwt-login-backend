import { Request, Response, NextFunction } from 'express';
import { loginUser, signupUser } from './auth.service';
import { loginSchema, signupSchema } from './auth.dto';

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      success: false,
      message: validation.error.issues[0]?.message || 'Invalid input',
      data: null
    });
    return;
  }

  try {
    const { email, password } = validation.data;
    const data = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        data: null
      });
      return;
    }

    next(error);
  }
}

export async function signup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const validation = signupSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      success: false,
      message: validation.error.issues[0]?.message || 'Invalid input',
      data: null
    });
    return;
  }

  try {
    const { email, password } = validation.data;
    const data = await signupUser(email, password);

    res.status(201).json({
      success: true,
      message: 'Signup successful',
      data
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'EMAIL_EXISTS') {
      res.status(409).json({
        success: false,
        message: 'Email already exists',
        data: null
      });
      return;
    }

    next(error);
  }
}

export function getMe(req: Request, res: Response): Response {
  return res.status(200).json({
    success: true,
    message: 'User details retrieved successfully',
    data: {
      user: (
        req as Request & {
          user?: { id: number; email: string };
        }
      ).user
    }
  });
}