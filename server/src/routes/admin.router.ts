import { BaseRouter } from '../core/base-router';
import { AdminController } from '../controllers/admin.controller';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';
import { Role } from '../models';

export class AdminRouter extends BaseRouter {
  private adminController = new AdminController();

  protected registerRoutes(): void {
    // All routes below require Authentication and ADMIN roles
    this.router.use(requireAuth, requireRole([Role.ADMIN]));

    this.router.get('/dashboard', this.adminController.getStats);
    this.router.post('/promote-writer', this.adminController.promoteToWriter);
    this.router.put('/me', this.adminController.updateProfile);
  }
}
