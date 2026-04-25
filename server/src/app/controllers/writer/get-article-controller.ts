import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";

class GetArticleController extends BaseController {
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

    const article = await this.Service.ArticleServices.GetArticleById.call(id);

    if (!article) {
      return this.responseHandler(res, this.NOT_FOUND_CODE, this.NOT_FOUND_MSG);
    }

    // Ownership check — writers can only read their own articles
    if (article.author_id !== user.user_id) {
      return this.responseHandler(
        res,
        403,
        "Access denied. This article does not belong to you.",
      );
    }

    return this.responseHandler(
      res,
      this.SUCCESS_CODE,
      this.SUCCESS_MSG,
      article,
    );
  }
}

export default GetArticleController;
