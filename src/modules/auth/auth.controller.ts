import {
  Request,
  Response,
  NextFunction
} from 'express';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { LoginDto, SignupDto } from './auth.dto';
import { loginUser, signupUser } from './auth.service';
import { BadRequestError } from '../../core/errors/http.error';

export class AuthController {
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Log in an existing user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AuthRequest'
   *           example:
   *             email: demo@gmail.com
   *             password: demo123
   *     responses:
   *       200:
   *         description: Login successful
   *       400:
   *         description: Invalid request body
   *       401:
   *         description: Invalid email or password
   *       500:
   *         description: Internal server error
   */
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = plainToInstance(LoginDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        throw new BadRequestError(
          errors[0]?.constraints
            ? Object.values(errors[0].constraints)[0]
            : 'Invalid input'
        );
      }

      const data = await loginUser(dto.email, dto.password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/signup:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Register a new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AuthRequest'
   *           example:
   *             email: newuser@example.com
   *             password: password123
   *     responses:
   *       201:
   *         description: Signup successful
   *       400:
   *         description: Invalid request body
   *       409:
   *         description: Email already exists
   *       500:
   *         description: Internal server error
   */
  static async signup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = plainToInstance(SignupDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        throw new BadRequestError(
          errors[0]?.constraints
            ? Object.values(errors[0].constraints)[0]
            : 'Invalid input'
        );
      }

      const data = await signupUser(dto.email, dto.password);

      res.status(201).json({
        success: true,
        message: 'Signup successful',
        data
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/me:
   *   get:
   *     tags:
   *       - Authentication
   *     summary: Get the logged-in user's details
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User details retrieved successfully
   *       401:
   *         description: Missing or invalid token
   *       500:
   *         description: Internal server error
   */
  static async getMe(
    req: Request,
    res: Response
  ): Promise<void> {
    const user = (
      req as Request & {
        user?: { id: number; email: string };
      }
    ).user;

    res.status(200).json({
      success: true,
      message: 'User details retrieved successfully',
      data: user
    });
  }
}