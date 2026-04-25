import { Router, Request, Response, NextFunction } from "express";
import { IRoute } from "@/types/app.js";
import MiddleWares from "@/app/middlewares/index.js";
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
      (req: Request, res: Response, next: NextFunction) => {
        MiddleWares.UserMiddleWares.UserAuth.run(req, res, next);
      },
      (req: Request, res: Response, next: NextFunction) => {
        MiddleWares.AdminMiddleWares.IsAdmin.run(req, res, next);
      },
      (req, res) => {
        new GetPromotionRequestsController().execute(req, res);
      },
    );
  }
}

export default GetPromotionRequestsRoute;
