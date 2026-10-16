export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Invalid input') {
    super(400, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Invalid email or password') {
    super(401, message);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Email already exists') {
    super(409, message);
  }
}