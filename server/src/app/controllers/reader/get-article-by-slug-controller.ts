import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";

class GetArticleBySlugController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const slug = req.params.slug as string;

      const article =
        await this.Service.ArticleServices.GetPublicArticleBySlug.call(slug);

      if (!article) {
        return this.responseHandler(
          res,
          this.NOT_FOUND_CODE,
          "Article not found or not published.",
        );
      }

      return this.responseHandler(
        res,
        this.SUCCESS_CODE,
        "Article fetched successfully",
        article,
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

export default GetArticleBySlugController;
