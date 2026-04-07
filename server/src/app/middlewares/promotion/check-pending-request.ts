import { Request, Response, NextFunction } from "express";
import BaseMiddleware from "@/core/base/base-middleware.js";
import FindPendingRequestService from "@/database/services/promotion/find-pending-request-service.js";

class CheckPendingRequestMiddleware extends BaseMiddleware {
  protected async middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    const user = req.currentUser;

    if (!user) {
      return this.responseHandler(res, 401, "You are not authenticated.");
    }

    const pendingRequestService = new FindPendingRequestService();
    const pendingRequest = await pendingRequestService.call(user.user_id);

    if (pendingRequest) {
      return this.responseHandler(
        res,
        409,
        "You already have a pending promotion request. Please wait for it to be reviewed.",
      );
    }

    next();
  }
}

export default CheckPendingRequestMiddleware;
