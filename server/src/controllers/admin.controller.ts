import { Request, Response } from 'express';
import { BaseController } from '../core/base-controller';
import { AdminService } from '../services/admin.service';
import { ApiError } from '../utils';

export class AdminController extends BaseController {
  private adminService = new AdminService();

  public promoteToWriter = this.asyncHandler(async (req: Request, res: Response) => {
    const targetUserId = req.body.userId;
    if (!targetUserId) {
      throw new ApiError(400, 'User ID is required');
    }

    const result = await this.adminService.promoteToWriter(targetUserId);
    return this.sendSuccess(res, result, 'User promoted to Writer successfully');
  });

  public updateProfile = this.asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const updatedAdmin = await this.adminService.updateAdminProfile(userId, req.body);
    return this.sendSuccess(res, updatedAdmin, 'Admin profile updated successfully');
  });

  public getStats = this.asyncHandler(async (req: Request, res: Response) => {
    const stats = await this.adminService.getDashboardStats();
    return this.sendSuccess(res, stats, 'Statistics retrieved successfully');
  });
}
