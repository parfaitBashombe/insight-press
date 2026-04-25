import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";

class ChangePasswordController extends BaseController {
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

      const { oldPassword, newPassword } = req.body;

      const result = await this.Service.UserServices.ChangePassword.call({
        userId: user.user_id,
        oldPassword,
        newPassword,
      });

      if (!result) {
        return this.responseHandler(
          res,
          this.SERVER_ERROR_CODE,
          "Operation failed",
        );
      }

      if ("error" in result) {
        return this.responseHandler(res, this.BAD_REQUEST_CODE, result.error);
      }

      return this.responseHandler(
        res,
        this.SUCCESS_CODE,
        "Password changed successfully",
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

export default ChangePasswordController;
