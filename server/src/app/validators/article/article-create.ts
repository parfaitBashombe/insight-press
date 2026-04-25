import BaseMiddleWare from "@/core/base/base-middleware.js";
import { Request, Response, NextFunction } from "express";

class CreateArticleValidator extends BaseMiddleWare {
  protected async middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = this.z.object({
      title: this.z.string().min(3, "Title must be at least 3 characters"),
      content: this.z
        .string()
        .min(10, "Content must be at least 10 characters"),
      cover_image: this.z.url("cover_image must be a valid URL").optional(),
    });

    this.bodyHandler(req, res, next, schema);
  }
}

export default CreateArticleValidator;
