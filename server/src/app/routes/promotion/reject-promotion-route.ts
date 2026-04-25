import { Router, Request, Response, NextFunction } from "express";
import { IRoute } from "@/types/app.js";
import MiddleWares from "@/app/middlewares/index.js";
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
      (req: Request, res: Response, next: NextFunction) => {
        MiddleWares.UserMiddleWares.UserAuth.run(req, res, next);
      },
      (req: Request, res: Response, next: NextFunction) => {
        MiddleWares.AdminMiddleWares.IsAdmin.run(req, res, next);
      },
      (req, res) => {
        new RejectPromotionController().execute(req, res);
      },
    );
  }
}

export default RejectPromotionRoute;
