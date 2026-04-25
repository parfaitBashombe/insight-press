import { Request, Response, NextFunction, Router } from "express";
import { IRoute } from "@/types/app.js";
import Controllers from "@/app/controllers/index.js";
import Validators from "@/app/validators/index.js";
import MiddleWares from "@/app/middlewares/index.js";

class GetArticleRoute implements IRoute {
  path: string;
  router;

  constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.initRoute();
  }

  private initRoute(): void {
    this.router.route(`${this.path}/:id`).get(
      (req: Request, res: Response, next: NextFunction) =>
        MiddleWares.UserMiddleWares.UserAuth.run(req, res, next),

      (req: Request, res: Response, next: NextFunction) =>
        MiddleWares.WriterMiddleWares.IsWriter.run(req, res, next),

      (req: Request, res: Response, next: NextFunction) =>
        Validators.Id.run(req, res, next),

      (req: Request, res: Response) =>
        Controllers.WriterControllers.GetArticle.execute(req, res),
    );
  }
}

export default GetArticleRoute;
