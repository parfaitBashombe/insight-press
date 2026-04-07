import { Router } from "express";
import { IRoute } from "@/types/app.js";
import Authentication from "@/app/middlewares/user/authentication.js";
import RequireRoleMiddleware from "@/app/middlewares/user/require-role.js";
import UpdateAdminProfileController from "@/app/controllers/profile/update-admin-profile.js";

class AdminProfileRoute implements IRoute {
  public path = "/profile/admin";
  public router = Router();

  constructor(pathPrefix: string) {
    this.path = `${pathPrefix}${this.path}`;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      this.path,
      (req, res, next) => {
        new Authentication().run(req, res, next);
      },
      (req, res, next) => {
        new RequireRoleMiddleware(["ADMIN"]).run(req, res, next);
      },
      (req, res) => {
        new UpdateAdminProfileController().execute(req, res);
      }
    );
  }
}

export default AdminProfileRoute;
