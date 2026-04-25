import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";

class UnpublishArticleController extends BaseController {
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

      const id = req.params.id as string;

      // Ensure the article exists and belongs to the user
      const article =
        await this.Service.ArticleServices.GetArticleById.call(id);

      if (!article) {
        return this.responseHandler(
          res,
          this.NOT_FOUND_CODE,
          "Article not found.",
        );
      }

      // Check ownership
      if (article.author_id !== user.user_id) {
        return this.responseHandler(
          res,
          403,
          "You can only unpublish your own articles.",
        );
      }

      const unpublishedArticle =
        await this.Service.ArticleServices.UnpublishArticle.call(id);

      if (!unpublishedArticle) {
        return this.responseHandler(
          res,
          this.BAD_REQUEST_CODE,
          "Article cannot be unpublished (it might not be PUBLISHED).",
        );
      }

      return this.responseHandler(
        res,
        this.SUCCESS_CODE,
        "Article unpublished successfully",
        unpublishedArticle,
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

export default UnpublishArticleController;
