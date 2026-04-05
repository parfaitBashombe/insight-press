import { Request, Response, NextFunction } from 'express';
import { ApiError, ApiResponse } from '../utils';
import { env } from '../config';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === 'PrismaClientKnownRequestError') {
    // Basic Prisma error handling mapping
    if (err.code === 'P2002') {
      statusCode = 409;
      message = 'Duplicate field value entered';
    } else {
      statusCode = 400;
      message = 'Database operation failed';
    }
  } else if (err.name === 'ZodError') {
      statusCode = 400;
      message = 'Validation Error';
      // In a more robust setup, we'd extract specific field errors
  } else if (err.message) {
      message = err.message;
  }

  // Include stack trace only in development
  const responseData = env.nodeEnv === 'development' ? { stack: err.stack } : null;

  res.status(statusCode).json(
    new ApiResponse(false, message, responseData)
  );
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, `Not Found - ${req.originalUrl}`));
};
