import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core/errors/http.error';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null
    });
    return;
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    data: null
  });
}