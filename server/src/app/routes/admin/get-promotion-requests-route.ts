import { Router } from "express";
import { IRoute } from "@/types/app.js";
import Authentication from "@/app/middlewares/user/authentication.js";
import RequireRoleMiddleware from "@/app/middlewares/user/require-role.js";
import GetPromotionRequestsController from "@/app/controllers/admin/get-promotion-requests-controller.js";

class GetPromotionRequestsRoute implements IRoute {
  public path = "/admin/promotion-requests";
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
        // Only an Admin can view all requests
        new RequireRoleMiddleware(["ADMIN"]).run(req, res, next);
      },
      (req, res) => {
        new GetPromotionRequestsController().execute(req, res);
      }
    );
  }
}

export default GetPromotionRequestsRoute;
