import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";
import GetAllUsersService from "@/database/services/admin/get-all-users-service.js";

class GetAllUsersController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const getService = new GetAllUsersService();
      const users = await getService.call();

      return this.responseHandler(
        res,
        200,
        "Users fetched successfully",
        users,
      );
    } catch (error: unknown) {
      return this.responseHandler(res, 500, "Internal server error");
    }
  }
}

export default GetAllUsersController;
