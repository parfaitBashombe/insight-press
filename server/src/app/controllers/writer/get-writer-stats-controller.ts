import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";

class GetWriterStatsController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const user = req.currentUser;

      if (!user) {
        return this.responseHandler(
          res,
          this.UNAUTHORIZED_CODE,
          "You are not authenticated",
        );
      }

      const stats = await this.Service.ArticleServices.GetWriterStats.call(
        user.user_id,
      );

      return this.responseHandler(
        res,
        this.SUCCESS_CODE,
        "Writer stats fetched successfully",
        stats,
      );
    } catch {
      return this.responseHandler(
        res,
        this.SERVER_ERROR_CODE,
        "Internal server error",
      );
    }
  }
}

export default GetWriterStatsController;
