import { Router } from "express";
import { IRoute } from "@/types/app.js";
import RequestPromotionController from "@/app/controllers/promotion/request-promotion-controller.js";
import CheckPendingRequestMiddleware from "@/app/middlewares/promotion/check-pending-request.js";
import Authentication from "@/app/middlewares/user/authentication.js";
import RequestPromotionValidator from "@/app/validators/promotion/request-promotion-validator.js";

class RequestPromotionRoute implements IRoute {
  public path = "/promotion/request";
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
        new CheckPendingRequestMiddleware().run(req, res, next);
      },
      (req, res, next) => {
        new RequestPromotionValidator().run(req, res, next);
      },
      (req, res) => {
        new RequestPromotionController().execute(req, res);
      }
    );
  }
}

export default RequestPromotionRoute;
