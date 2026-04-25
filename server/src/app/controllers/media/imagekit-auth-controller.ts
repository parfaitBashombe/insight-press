import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";
import MediaServices from "@/database/services/media/index.js";

class ImageKitAuthController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      // UserAuth middleware handles checking if user exists
      const user = req.currentUser;

      if (!user) {
        return this.responseHandler(
          res,
          this.UNAUTHORIZED_CODE,
          "You are not authenticated",
        );
      }

      const authData = await MediaServices.ImageKitAuth.call();

      return this.responseHandler(
        res,
        this.SUCCESS_CODE,
        "ImageKit auth generated successfully",
        authData,
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

export default ImageKitAuthController;
