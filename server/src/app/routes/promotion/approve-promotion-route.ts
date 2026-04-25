import { Router, Request, Response, NextFunction } from "express";
import { IRoute } from "@/types/app.js";
import MiddleWares from "@/app/middlewares/index.js";
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
      (req: Request, res: Response, next: NextFunction) => {
        MiddleWares.UserMiddleWares.UserAuth.run(req, res, next);
      },
      (req: Request, res: Response, next: NextFunction) => {
        MiddleWares.AdminMiddleWares.IsAdmin.run(req, res, next);
      },
      (req, res) => {
        new ApprovePromotionController().execute(req, res);
      },
    );
  }
}

export default ApprovePromotionRoute;
