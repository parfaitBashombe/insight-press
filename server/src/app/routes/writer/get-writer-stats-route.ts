import { Request, Response, Router } from "express";
import { IRoute } from "@/types/app.js";
import Controllers from "@/app/controllers/index.js";
import MiddleWares from "@/app/middlewares/index.js";

class GetWriterStatsRoute implements IRoute {
  path: string;
  router;

  constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.initRoute();
  }

  private initRoute(): void {
    // /writer/articles/stats -> However, the base path is /writer/articles.
    // Wait, the path is already /writer/articles. So /writer/articles/stats could conflict with /writer/articles/:id
    // It's crucial this route is registered BEFORE routes with /:id!
    this.router.route(`${this.path}/stats/overview`).get(
      (req, res, next) =>
        MiddleWares.UserMiddleWares.UserAuth.run(req, res, next),
      (req, res, next) =>
        MiddleWares.WriterMiddleWares.IsWriter.run(req, res, next),
      (req: Request, res: Response) =>
        Controllers.WriterControllers.GetWriterStats.execute(req, res),
    );
  }
}

export default GetWriterStatsRoute;
