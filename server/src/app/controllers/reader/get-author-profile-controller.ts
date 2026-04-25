import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";

class GetAuthorProfileController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const id = req.params.id as string;

      const profile =
        await this.Service.ArticleServices.GetPublicAuthorProfile.call(id);

      if (!profile) {
        return this.responseHandler(
          res,
          this.NOT_FOUND_CODE,
          "Author not found.",
        );
      }

      return this.responseHandler(
        res,
        this.SUCCESS_CODE,
        "Author profile fetched successfully",
        profile,
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

export default GetAuthorProfileController;
