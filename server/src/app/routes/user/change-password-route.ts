import { Request, Response, Router } from "express";
import { IRoute } from "@/types/app.js";
import Controllers from "@/app/controllers/index.js";
import MiddleWares from "@/app/middlewares/index.js";
import UserValidators from "@/app/validators/user/index.js";

class ChangePasswordRoute implements IRoute {
  path: string;
  router;

  constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.initRoute();
  }

  private initRoute(): void {
    this.router.route(`${this.path}/password`).patch(
      (req, res, next) =>
        MiddleWares.UserMiddleWares.UserAuth.run(req, res, next),
      (req, res, next) => UserValidators.ChangePassword.run(req, res, next),
      (req: Request, res: Response) =>
        Controllers.UserControllers.ChangePassword.execute(req, res),
    );
  }
}

export default ChangePasswordRoute;
