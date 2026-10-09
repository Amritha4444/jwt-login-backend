import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err);

  if (res.headersSent) {
    next(err);
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    data: null
  });
}