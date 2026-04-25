import { Router } from "express";
import { IRoute } from "@/types/app.js";
import Authentication from "@/app/middlewares/user/authentication.js";
import RequireRoleMiddleware from "@/app/middlewares/user/require-role.js";
import RejectPromotionController from "@/app/controllers/promotion/reject-promotion-controller.js";

class RejectPromotionRoute implements IRoute {
  public path = "/promotion/reject/:id";
  public router = Router();

  constructor(pathPrefix: string) {
    this.path = `${pathPrefix}${this.path}`;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.patch(
      this.path,
      (req, res, next) => {
        new Authentication().run(req, res, next);
      },
      (req, res, next) => {
        // Only an Admin can reject promotions
        new RequireRoleMiddleware(["ADMIN"]).run(req, res, next);
      },
      (req, res) => {
        new RejectPromotionController().execute(req, res);
      },
    );
  }
}

export default RejectPromotionRoute;
