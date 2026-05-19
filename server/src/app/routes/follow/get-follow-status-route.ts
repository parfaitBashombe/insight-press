import { Request, Response, Router } from "express";
import { IRoute } from "@/types/app.js";
import Controllers from "@/app/controllers/index.js";
import MiddleWares from "@/app/middlewares/index.js";

class GetFollowStatusRoute implements IRoute {
  path: string;
  router;

  constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.initRoute();
  }

  private initRoute(): void {
    this.router
      .route(`${this.path}/:id/follow-status`)
      .get(
        (req: Request, res: Response, next) =>
          MiddleWares.UserMiddleWares.UserAuth.run(req, res, next),
        (req: Request, res: Response) =>
          Controllers.FollowControllers.GetFollowStatus.execute(req, res),
      );
  }
}

export default GetFollowStatusRoute;
