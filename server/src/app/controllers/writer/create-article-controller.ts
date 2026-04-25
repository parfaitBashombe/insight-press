import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";
import { CreateArticle } from "@/types/article.js";

class CreateArticleController extends BaseController {
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

    const data: CreateArticle = req.body;

    const article = await this.Service.ArticleServices.CreateArticle.call({
      ...data,
      authorId: user.user_id,
    });

    if (!article) {
      return this.responseHandler(
        res,
        this.BAD_REQUEST_CODE,
        this.BAD_REQUEST_MSG,
      );
    }

    return this.responseHandler(
      res,
      this.CREATED_CODE,
      "Article created successfully.",
      article,
    );
  }
}

export default CreateArticleController;
