import { BaseRouter } from '../core/base-router';
import { PostController } from '../controllers/post.controller';
import { requireAuth } from '../middlewares/auth.middleware';

export class PostRouter extends BaseRouter {
  private postController = new PostController();

  protected registerRoutes(): void {
    // Public routes
    this.router.get('/', this.postController.getPosts);
    this.router.get('/:id', this.postController.getPost);

    // Protected routes
    this.router.post('/', requireAuth, this.postController.createPost);
  }
}
