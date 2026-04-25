import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";
import RejectPromotionService from "@/database/services/promotion/reject-promotion-service.js";

class RejectPromotionController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const promotionRequestId = req.params.id as string;

    if (!promotionRequestId) {
      return this.responseHandler(
        res,
        400,
        "Promotion Request ID is required.",
      );
    }

    try {
      const rejectService = new RejectPromotionService();
      const rejectedRequest = await rejectService.call(promotionRequestId);

      if (!rejectedRequest) {
        return this.responseHandler(
          res,
          500,
          "Failed to reject promotion request.",
        );
      }

      return this.responseHandler(
        res,
        200,
        "Promotion request rejected successfully.",
        rejectedRequest,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("not found")) {
          return this.responseHandler(res, 404, error.message);
        }
        if (error.message.includes("already")) {
          return this.responseHandler(res, 400, error.message);
        }
      }
      return this.responseHandler(res, 500, "Internal server error");
    }
  }
}

export default RejectPromotionController;
