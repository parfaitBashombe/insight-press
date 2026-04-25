import BaseMiddleWare from "@/core/base/base-middleware.js";
import { Request, Response, NextFunction } from "express";

class UpdateUserRoleValidator extends BaseMiddleWare {
  protected async middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = this.z.object({
      role_id: this.z.string().uuid("Role ID must be a valid UUID"),
    });

    this.bodyHandler(req, res, next, schema);
  }
}

export default UpdateUserRoleValidator;
