import BaseMiddleWare from "@/core/base/base-middleware.js";
import { Request, Response, NextFunction } from "express";
import FindRoleByIdService from "@/database/services/role/find-role-by-id-service.js";

class IsWriterMiddleware extends BaseMiddleWare {
  protected async middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = req.currentUser;

    if (!user) {
      this.responseHandler(res, 401, "You are not authenticated.");
      return;
    }

    const findRoleService = new FindRoleByIdService();
    const role = await findRoleService.call(user.role_id);

    if (!role) {
      this.responseHandler(res, 403, "Role mapping not found.");
      return;
    }

    const allowedRoles = ["WRITER", "ADMIN"];

    if (!allowedRoles.includes(role.name)) {
      this.responseHandler(
        res,
        403,
        "Access denied. Requires WRITER or ADMIN privileges.",
      );
      return;
    }

    req.currentRole = role;
    next();
  }
}

export default IsWriterMiddleware;
