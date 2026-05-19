import BaseMiddleWare from "@/core/base/base-middleware.js";
import { Request, Response, NextFunction } from "express";

class UserAuthentication extends BaseMiddleWare {
  protected async middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const extracted = this.Utils.Token.extract(req);

    if (!extracted) {
      this.responseHandler(res, this.UNAUTHORIZED_CODE, this.UNAUTHORIZED_MSG);
      return;
    }

    const decoded = this.Utils.Token.decodeAccess(extracted.token);

    if (!decoded) {
      this.responseHandler(res, this.UNAUTHORIZED_CODE, this.UNAUTHORIZED_MSG);
      return;
    }

    const payload = decoded.payload as Record<string, unknown>;

    // Tokens generated before the refresh-flow fix only carry userId.
    // Look up by email when present, otherwise fall back to userId.
    let user;
    if (payload.email) {
      user = await this.Service.UserServices.GetUserByEmail.call(
        payload.email as string,
      );
    } else if (payload.user_id) {
      user = await this.Service.UserServices.GetUserById.call(
        payload.user_id as string,
      );
    } else {
      this.responseHandler(res, this.UNAUTHORIZED_CODE, this.UNAUTHORIZED_MSG);
      return;
    }

    if (!user) {
      this.responseHandler(res, this.UNAUTHORIZED_CODE, this.UNAUTHORIZED_MSG);
      return;
    }

    req.currentUser = user;

    return next();
  }
}

export default UserAuthentication;
