import { Request, Response } from 'express';
import { BaseController } from '../core/base-controller';
import { PostService } from '../services/post.service';
import { ApiError } from '../utils';

export class PostController extends BaseController {
  private postService = new PostService();

  public getPosts = this.asyncHandler(async (req: Request, res: Response) => {
    const posts = await this.postService.getAllPosts();
    return this.sendSuccess(res, posts, 'Posts retrieved successfully');
  });

  public getPost = this.asyncHandler(async (req: Request, res: Response) => {
    const post = await this.postService.getPostById(req.params.id);
    if (!post) {
      throw new ApiError(404, 'Post not found');
    }
    return this.sendSuccess(res, post, 'Post retrieved successfully');
  });

  public createPost = this.asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const post = await this.postService.createPost(userId, req.body);
    return this.sendCreated(res, post, 'Post created successfully');
  });
}
