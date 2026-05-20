import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";

class GetArticlesController extends BaseController {
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

    const page = parseInt((req.query.page as string) ?? "1", 10);
    const pageSize = parseInt((req.query.pageSize as string) ?? "10", 10);

    const paginated =
      await this.Service.ArticleServices.GetArticlesByAuthor.call({
        authorId: user.user_id,
        page: isNaN(page) || page < 1 ? 1 : page,
        pageSize: isNaN(pageSize) || pageSize < 1 ? 10 : pageSize,
      });

    return this.responseHandler(
      res,
      this.SUCCESS_CODE,
      this.SUCCESS_MSG,
      paginated,
    );
  }
}

export default GetArticlesController;
