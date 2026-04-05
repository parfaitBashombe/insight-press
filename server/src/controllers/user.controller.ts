import { Request, Response } from 'express';
import { BaseController } from '../core/base-controller';
import { UserService } from '../services/user.service';
import { ApiError } from '../utils';

export class UserController extends BaseController {
  private userService = new UserService();

  public getMe = this.asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return this.sendSuccess(res, user, 'User retrieved successfully');
  });

  public getAllUsers = this.asyncHandler(async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    return this.sendSuccess(res, users, 'Users retrieved successfully');
  });
}
