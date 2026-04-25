import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";

class GetArticlesController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const search = req.query.search as string | undefined;
      const authorId = req.query.authorId as string | undefined;

      const articles =
        await this.Service.ArticleServices.GetPublicArticles.call({
          page,
          pageSize,
          search,
          authorId,
        });

      return this.responseHandler(
        res,
        this.SUCCESS_CODE,
        "Articles fetched successfully",
        articles,
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

export default GetArticlesController;
