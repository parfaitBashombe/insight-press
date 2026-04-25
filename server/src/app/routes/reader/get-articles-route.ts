import { Request, Response, Router } from "express";
import { IRoute } from "@/types/app.js";
import Controllers from "@/app/controllers/index.js";

class GetArticlesRoute implements IRoute {
  path: string;
  router;

  constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.initRoute();
  }

  private initRoute(): void {
    // Public route: no auth middleware
    this.router
      .route(`${this.path}`)
      .get((req: Request, res: Response) =>
        Controllers.ReaderControllers.GetArticles.execute(req, res),
      );
  }
}

export default GetArticlesRoute;
