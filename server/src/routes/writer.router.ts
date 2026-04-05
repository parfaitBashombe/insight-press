import { BaseRouter } from '../core/base-router';
import { WriterController } from '../controllers/writer.controller';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';
import { Role } from '../models';

export class WriterRouter extends BaseRouter {
  private writerController = new WriterController();

  protected registerRoutes(): void {
    // Public endpoint: View a writer's profile (bio + user info)
    this.router.get('/:userId', this.writerController.getProfile);

    // Protected endpoint: Update own bio (needs Auth + specific role, e.g. AUTHOR or ADMIN)
    this.router.put('/me/bio', requireAuth, requireRole([Role.AUTHOR, Role.ADMIN]), this.writerController.updateBio);
  }
}
