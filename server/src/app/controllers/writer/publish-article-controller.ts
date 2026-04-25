import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";

class PublishArticleController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const user = req.currentUser;

    if (!user) {
      return this.responseHandler(
        res,
        this.UNAUTHORIZED_CODE,
        this.UNAUTHORIZED_MSG,
      );
    }

    const id = req.params.id as string;

    // First check if it exists and ownership
    const existing = await this.Service.ArticleServices.GetArticleById.call(id);

    if (!existing) {
      return this.responseHandler(res, this.NOT_FOUND_CODE, this.NOT_FOUND_MSG);
    }

    if (existing.author_id !== user.user_id) {
      return this.responseHandler(
        res,
        403,
        "Access denied. This article does not belong to you.",
      );
    }

    const published =
      await this.Service.ArticleServices.PublishArticle.call(id);

    if (!published) {
      return this.responseHandler(
        res,
        this.SERVER_ERROR_CODE,
        "Failed to publish article",
      );
    }

    return this.responseHandler(
      res,
      this.SUCCESS_CODE,
      "Article published successfully",
      published,
    );
  }
}

export default PublishArticleController;
