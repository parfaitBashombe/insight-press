import { Router, Request, Response, NextFunction } from "express";
import { IRoute } from "@/types/app.js";
import MiddleWares from "@/app/middlewares/index.js";
import UpdateUserStatusController from "@/app/controllers/admin/update-user-status-controller.js";
import UpdateUserStatusValidator from "@/app/validators/admin/update-user-status-validator.js";

class UpdateUserStatusRoute implements IRoute {
  public path = "/admin/users/:id/status";
  public router = Router();

  constructor(pathPrefix: string) {
    this.path = `${pathPrefix}${this.path}`;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.patch(
      this.path,
      (req: Request, res: Response, next: NextFunction) => {
        new UpdateUserStatusValidator().run(req, res, next);
      },
      (req: Request, res: Response, next: NextFunction) => {
        MiddleWares.UserMiddleWares.UserAuth.run(req, res, next);
      },
      (req: Request, res: Response, next: NextFunction) => {
        MiddleWares.AdminMiddleWares.IsAdmin.run(req, res, next);
      },
      (req: Request, res: Response) => {
        new UpdateUserStatusController().execute(req, res);
      },
    );
  }
}

export default UpdateUserStatusRoute;
