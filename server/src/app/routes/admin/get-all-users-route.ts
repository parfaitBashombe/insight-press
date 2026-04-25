import { Router } from "express";
import { IRoute } from "@/types/app.js";
import Authentication from "@/app/middlewares/user/authentication.js";
import RequireRoleMiddleware from "@/app/middlewares/user/require-role.js";
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
      (req, res, next) => {
        new Authentication().run(req, res, next);
      },
      (req, res, next) => {
        // Only an Admin can view all users
        new RequireRoleMiddleware(["ADMIN"]).run(req, res, next);
      },
      (req, res) => {
        new GetAllUsersController().execute(req, res);
      },
    );
  }
}

export default GetAllUsersRoute;
