import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { loginUser, signupUser } from './auth.service';
import { LoginDto, SignupDto } from './auth.dto';
import { SafeUser } from './user.model';
import { BadRequestError } from '../../core/errors/http.error';

export class AuthController {
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Log in a user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AuthRequest'
   *     responses:
   *       '200':
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ApiResponse'
   *       '400':
   *         description: Invalid request data
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       '401':
   *         description: Invalid email or password
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       '500':
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
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
        const message = errors[0].constraints
          ? Object.values(errors[0].constraints)[0]
          : 'Invalid input';

        throw new BadRequestError(message);
      }

      const data = await loginUser(dto.email, dto.password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/signup:
   *   post:
   *     summary: Register a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AuthRequest'
   *     responses:
   *       '201':
   *         description: Signup successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ApiResponse'
   *       '400':
   *         description: Invalid request data
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       '409':
   *         description: Email already exists
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       '500':
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
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
        const message = errors[0].constraints
          ? Object.values(errors[0].constraints)[0]
          : 'Invalid input';

        throw new BadRequestError(message);
      }

      const data = await signupUser(dto.email, dto.password);

      res.status(201).json({
        success: true,
        message: 'Signup successful',
        data
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/me:
   *   get:
   *     summary: Get the authenticated user's details
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       '200':
   *         description: User details retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ApiResponse'
   *       '401':
   *         description: Missing or invalid JWT
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       '500':
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  static getMe(req: Request, res: Response): void {
    const user = (
      req as Request & { user?: SafeUser }
    ).user;

    res.status(200).json({
      success: true,
      message: 'User details retrieved successfully',
      data: { user }
    });
  }
}