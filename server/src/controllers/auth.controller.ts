import { Request, Response } from 'express';
import { BaseController } from '../core/base-controller';
import { AuthService } from '../services/auth.service';
import { ApiError } from '../utils';

export class AuthController extends BaseController {
  private authService = new AuthService();

  public register = this.asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await this.authService.register(req.body);
      return this.sendCreated(res, result, 'Registration successful');
    } catch (error: any) {
      if (error.message === 'User already exists') {
        throw new ApiError(409, error.message);
      }
      throw error;
    }
  });

  public login = this.asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await this.authService.login(req.body);
      return this.sendSuccess(res, result, 'Login successful');
    } catch (error: any) {
      if (error.message === 'Invalid email or password') {
        throw new ApiError(401, error.message);
      }
      throw error;
    }
  });
}
