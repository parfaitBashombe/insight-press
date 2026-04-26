import { Request, Response, Router } from "express";
import { IRoute } from "@/types/app.js";
import ResetPasswordController from "@/app/controllers/user/reset-password-controller.js";
import ResetPasswordValidator from "@/app/validators/user/reset-password.js";

class ResetPasswordRoute implements IRoute {
  path: string;
  router;

  constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.initRoute();
  }

  private initRoute(): void {
    this.router.route(`${this.path}reset-password`).post(
      (req, res, next) => new ResetPasswordValidator().run(req, res, next),
      (req: Request, res: Response) =>
        new ResetPasswordController().execute(req, res),
    );
  }
}

export default ResetPasswordRoute;
