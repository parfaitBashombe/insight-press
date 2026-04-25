import BaseMiddleWare from "@/core/base/base-middleware.js";
import { Request, Response, NextFunction } from "express";

class UpdateUserStatusValidator extends BaseMiddleWare {
  protected async middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = this.z.object({
      status: this.z.boolean(),
    });

    this.bodyHandler(req, res, next, schema);
  }
}

export default UpdateUserStatusValidator;
