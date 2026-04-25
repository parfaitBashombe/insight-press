import z from "zod";
import BaseMiddleWare from "@/core/base/base-middleware.js";
import { Request, Response, NextFunction } from "express";

class ChangePasswordValidator extends BaseMiddleWare {
  public validate = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
  });

  protected async middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const parsed = this.validate.safeParse(req.body);

    if (!parsed.success) {
      this.zodError(res, parsed.error);
      return;
    }

    next();
  }
}

export default ChangePasswordValidator;
