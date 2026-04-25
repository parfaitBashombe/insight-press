import { Request, Response, Router } from "express";
import { IRoute } from "@/types/app.js";
import ForgotPasswordController from "@/app/controllers/user/forgot-password-controller.js";
import ForgotPasswordValidator from "@/app/validators/user/forgot-password.js";

class ForgotPasswordRoute implements IRoute {
  path: string;
  router;

  constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.initRoute();
  }

  private initRoute(): void {
    this.router.route(`${this.path}forgot-password`).post(
      (req, res, next) => new ForgotPasswordValidator().run(req, res, next),
      (req: Request, res: Response) =>
        new ForgotPasswordController().execute(req, res),
    );
  }
}

export default ForgotPasswordRoute;
