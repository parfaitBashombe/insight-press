import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";
import GetPromotionRequestsService from "@/database/services/admin/get-promotion-requests-service.js";

class GetPromotionRequestsController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const getService = new GetPromotionRequestsService();
      const requests = await getService.call();

      return this.responseHandler(
        res,
        200,
        "Promotion requests fetched successfully",
        requests,
      );
    } catch (error: unknown) {
      return this.responseHandler(res, 500, "Internal server error");
    }
  }
}

export default GetPromotionRequestsController;
