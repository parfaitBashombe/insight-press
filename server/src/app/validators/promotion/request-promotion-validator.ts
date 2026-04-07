import BaseMiddleWare from "@/core/base/base-middleware.js";
import { Request, Response, NextFunction } from "express";

class RequestPromotionValidator extends BaseMiddleWare {
  protected async middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = this.z.object({
      requested_role: this.z
        .string()
        .min(1, "Requested role is required")
        .refine((val) => ["WRITER", "ADMIN"].includes(val), {
          message: "Requested role must be either WRITER or ADMIN",
        }),
      reason: this.z
        .string()
        .min(20, "Reason must be at least 20 characters long"),
    });

    this.bodyHandler(req, res, next, schema);
  }
}

export default RequestPromotionValidator;
