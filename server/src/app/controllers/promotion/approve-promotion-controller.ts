import { Request, Response } from "express";
import BaseControlller from "@/core/base/base-controller.js";
import ApprovePromotionService from "@/database/services/promotion/approve-promotion-service.js";

class ApprovePromotionController extends BaseControlller {
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
      const approveService = new ApprovePromotionService();

      const approvedRequest = await approveService.call(promotionRequestId);

      if (!approvedRequest) {
        return this.responseHandler(
          res,
          500,
          "Failed to approve promotion request.",
        );
      }

      return this.responseHandler(
        res,
        200,
        "Promotion request approved successfully. User role and profile updated.",
        approvedRequest,
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

export default ApprovePromotionController;
