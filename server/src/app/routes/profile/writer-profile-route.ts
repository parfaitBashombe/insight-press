import { Router } from "express";
import { IRoute } from "@/types/app.js";
import Authentication from "@/app/middlewares/user/authentication.js";
import RequireRoleMiddleware from "@/app/middlewares/user/require-role.js";
import UpdateWriterProfileController from "@/app/controllers/profile/update-writer-profile.js";

class WriterProfileRoute implements IRoute {
  public path = "/profile/writer";
  public router = Router();

  constructor(pathPrefix: string) {
    this.path = `${pathPrefix}${this.path}`;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      this.path,
      (req, res, next) => {
        new Authentication().run(req, res, next);
      },
      (req, res, next) => {
        // Enforce WRITER role requirement natively
        new RequireRoleMiddleware(["WRITER"]).run(req, res, next);
      },
      (req, res) => {
        new UpdateWriterProfileController().execute(req, res);
      }
    );
  }
}

export default WriterProfileRoute;
