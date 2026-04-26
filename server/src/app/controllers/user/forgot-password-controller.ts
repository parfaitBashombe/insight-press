import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";
import ForgotPasswordService from "@/database/services/user/forgot-password-service.js";

class ForgotPasswordController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const { email } = req.body as { email: string };

      const forgotPasswordService = new ForgotPasswordService();
      const result = await forgotPasswordService.call({ email });

      if (result && "error" in result) {
        return this.responseHandler(res, this.SERVER_ERROR_CODE, result.error);
      }

      // Always return 200 to avoid email enumeration
      return this.responseHandler(
        res,
        this.SUCCESS_CODE,
        "If an account with that email exists, a password reset link has been sent.",
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

export default ForgotPasswordController;
