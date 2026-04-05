import jwt from 'jsonwebtoken';
import { env } from './config';

// -----------------------------------------------------------------------------
// API Response Wrapper
// -----------------------------------------------------------------------------

export class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public data: T | null;

  constructor(success: boolean, message: string, data: T | null = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T>(data: T, message: string = 'Success') {
    return new ApiResponse(true, message, data);
  }

  static error(message: string = 'Error') {
    return new ApiResponse(false, message, null);
  }
}

// -----------------------------------------------------------------------------
// Custom API Error
// -----------------------------------------------------------------------------

export class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // enable instanceof
    Error.captureStackTrace(this);
  }
}

// -----------------------------------------------------------------------------
// JWT Helpers
// -----------------------------------------------------------------------------

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as any,
  });
};

export const verifyToken = (token: string): any | null => {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch (error) {
    return null;
  }
};
