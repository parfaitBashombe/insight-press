import { BaseRouter } from '../core/base-router';
import { AuthController } from '../controllers/auth.controller';

export class AuthRouter extends BaseRouter {
  private authController = new AuthController();

  protected registerRoutes(): void {
    this.router.post('/register', this.authController.register);
    this.router.post('/login', this.authController.login);
  }
}
