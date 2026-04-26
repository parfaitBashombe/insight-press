import z from "zod";
import BaseMiddleWare from "@/core/base/base-middleware.js";
import { Request, Response, NextFunction } from "express";

class ForgotPasswordValidator extends BaseMiddleWare {
  public validate = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
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

export default ForgotPasswordValidator;
