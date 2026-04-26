import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";
import ResetPasswordService from "@/database/services/user/reset-password-service.js";

class ResetPasswordController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const { token, newPassword } = req.body as {
        token: string;
        newPassword: string;
      };

      const resetPasswordService = new ResetPasswordService();
      const result = await resetPasswordService.call({ token, newPassword });

      if (result && "error" in result) {
        return this.responseHandler(res, this.BAD_REQUEST_CODE, result.error);
      }

      return this.responseHandler(
        res,
        this.SUCCESS_CODE,
        "Password has been reset successfully. You can now sign in with your new password.",
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

export default ResetPasswordController;
