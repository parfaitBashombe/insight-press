import { BaseRouter } from '../core/base-router';
import { UserController } from '../controllers/user.controller';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';
import { Role } from '../models';

export class UserRouter extends BaseRouter {
  private userController = new UserController();

  protected registerRoutes(): void {
    // Auth required for /me
    this.router.get('/me', requireAuth, this.userController.getMe);
    
    // Auth & Admin role required for /
    this.router.get('/', requireAuth, requireRole([Role.ADMIN]), this.userController.getAllUsers);
  }
}
