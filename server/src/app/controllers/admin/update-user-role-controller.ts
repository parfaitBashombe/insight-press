import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";
import UpdateUserRoleService from "@/database/services/admin/update-user-role-service.js";

class UpdateUserRoleController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const userId = req.params.id as string;
    const { role_id } = req.body;

    if (!userId) {
      return this.responseHandler(res, 400, "User ID is required");
    }

    try {
      const updateService = new UpdateUserRoleService();
      const updatedUser = await updateService.call({ userId, roleId: role_id });

      if (!updatedUser) {
        return this.responseHandler(res, 404, "User not found");
      }

      // We should omit sensitive data before sending back
      const { password, salt, ...safeUser } = updatedUser;

      return this.responseHandler(
        res,
        200,
        "User role updated successfully",
        safeUser,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (
          error.message.includes("User not found") ||
          error.message.includes("Role not found")
        ) {
          return this.responseHandler(res, 404, error.message);
        }
      }
      return this.responseHandler(res, 500, "Internal server error");
    }
  }
}

export default UpdateUserRoleController;
