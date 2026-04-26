import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";
import GetAdminStatsService from "@/database/services/admin/get-admin-stats-service.js";

class GetAdminStatsController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const getAdminStatsService = new GetAdminStatsService();
      const stats = await getAdminStatsService.call();

      return this.responseHandler(
        res,
        this.SUCCESS_CODE,
        "Admin stats fetched successfully",
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

export default GetAdminStatsController;
