import BaseMiddleWare from "@/core/base/base-middleware.js";
import { Request, Response, NextFunction } from "express";

class UpdateUserValidator extends BaseMiddleWare {
  protected async middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = this.z.object({
      fullname: this.z.string().optional(),
      bio: this.z.string().optional(),
      twitter: this.z.string().optional(),
      department: this.z.string().optional(),
    });

    this.bodyHandler(req, res, next, schema);
  }
}

export default UpdateUserValidator;
