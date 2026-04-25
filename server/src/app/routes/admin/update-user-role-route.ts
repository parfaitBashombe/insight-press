import { Router, Request, Response, NextFunction } from "express";
import { IRoute } from "@/types/app.js";
import MiddleWares from "@/app/middlewares/index.js";
import UpdateUserRoleController from "@/app/controllers/admin/update-user-role-controller.js";
import UpdateUserRoleValidator from "@/app/validators/admin/update-user-role-validator.js";

class UpdateUserRoleRoute implements IRoute {
  public path = "/admin/users/:id/role";
  public router = Router();

  constructor(pathPrefix: string) {
    this.path = `${pathPrefix}${this.path}`;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.patch(
      this.path,
      (req: Request, res: Response, next: NextFunction) => {
        new UpdateUserRoleValidator().run(req, res, next);
      },
      (req: Request, res: Response, next: NextFunction) => {
        MiddleWares.UserMiddleWares.UserAuth.run(req, res, next);
      },
      (req: Request, res: Response, next: NextFunction) => {
        MiddleWares.AdminMiddleWares.IsAdmin.run(req, res, next);
      },
      (req: Request, res: Response) => {
        new UpdateUserRoleController().execute(req, res);
      },
    );
  }
}

export default UpdateUserRoleRoute;
