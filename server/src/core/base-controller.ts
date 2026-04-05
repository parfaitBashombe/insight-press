import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils';

export abstract class BaseController {
  
  protected sendSuccess(res: Response, data: any, message: string = 'Success', statusCode: number = 200) {
    return res.status(statusCode).json(ApiResponse.success(data, message));
  }

  protected sendError(res: Response, message: string, statusCode: number = 400) {
    return res.status(statusCode).json(ApiResponse.error(message));
  }

  protected sendCreated(res: Response, data: any, message: string = 'Created') {
    return res.status(201).json(ApiResponse.success(data, message));
  }

  // Wrapper to handle async errors and pass them to the global error middleware
  protected asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn.bind(this)(req, res, next)).catch(next);
    };
  }
}
