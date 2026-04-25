import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";
import GetAllRolesService from "@/database/services/role/get-all-roles-service.js";

class GetRolesController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const getRolesService = new GetAllRolesService();
      const roles = await getRolesService.call();

      return this.responseHandler(
        res,
        this.SUCCESS_CODE,
        "Roles fetched successfully",
        roles,
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

export default GetRolesController;
