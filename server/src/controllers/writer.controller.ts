import { Request, Response } from 'express';
import { BaseController } from '../core/base-controller';
import { WriterService } from '../services/writer.service';
import { ApiError } from '../utils';

export class WriterController extends BaseController {
  private writerService = new WriterService();

  public getProfile = this.asyncHandler(async (req: Request, res: Response) => {
    const profile = await this.writerService.getWriterProfile(req.params.userId);
    
    if (!profile) {
      throw new ApiError(404, 'Writer profile not found');
    }

    return this.sendSuccess(res, profile, 'Profile retrieved successfully');
  });

  public updateBio = this.asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { bio } = req.body;

    if (!userId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const updatedWriter = await this.writerService.updateBio(userId, bio);
    return this.sendSuccess(res, updatedWriter, 'Bio updated successfully');
  });
}
