import { Request, Response, Router } from "express";
import { IRoute } from "@/types/app.js";
import MiddleWares from "@/app/middlewares/index.js";
import GetRolesController from "@/app/controllers/admin/get-roles-controller.js";

class GetRolesRoute implements IRoute {
  path: string;
  router;

  constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.initRoute();
  }

  private initRoute(): void {
    this.router.route(`${this.path}/admin/roles`).get(
      (req, res, next) =>
        MiddleWares.UserMiddleWares.UserAuth.run(req, res, next),
      (req, res, next) =>
        MiddleWares.AdminMiddleWares.IsAdmin.run(req, res, next),
      (req: Request, res: Response) =>
        new GetRolesController().execute(req, res),
    );
  }
}

export default GetRolesRoute;
