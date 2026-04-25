import { Router } from "express";
import { IRoute } from "@/types/app.js";
import Authentication from "@/app/middlewares/user/authentication.js";
import RequireRoleMiddleware from "@/app/middlewares/user/require-role.js";
import ApprovePromotionController from "@/app/controllers/promotion/approve-promotion-controller.js";

class ApprovePromotionRoute implements IRoute {
  public path = "/promotion/approve/:id";
  public router = Router();

  constructor(pathPrefix: string) {
    this.path = `${pathPrefix}${this.path}`;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      (req, res, next) => {
        new Authentication().run(req, res, next);
      },
      (req, res, next) => {
        // Only an Admin can approve promotions
        new RequireRoleMiddleware(["ADMIN"]).run(req, res, next);
      },
      (req, res) => {
        new ApprovePromotionController().execute(req, res);
      },
    );
  }
}

export default ApprovePromotionRoute;
