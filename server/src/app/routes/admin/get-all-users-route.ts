import { Router, Request, Response, NextFunction } from "express";
import { IRoute } from "@/types/app.js";
import MiddleWares from "@/app/middlewares/index.js";
import GetAllUsersController from "@/app/controllers/admin/get-all-users-controller.js";

class GetAllUsersRoute implements IRoute {
  public path = "/admin/users";
  public router = Router();

  constructor(pathPrefix: string) {
    this.path = `${pathPrefix}${this.path}`;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      this.path,
      (req: Request, res: Response, next: NextFunction) => {
        MiddleWares.UserMiddleWares.UserAuth.run(req, res, next);
      },
      (req: Request, res: Response, next: NextFunction) => {
        MiddleWares.AdminMiddleWares.IsAdmin.run(req, res, next);
      },
      (req, res) => {
        new GetAllUsersController().execute(req, res);
      },
    );
  }
}

export default GetAllUsersRoute;
