import { Request, Response } from "express";
import BaseController from "@/core/base/base-controller.js";
import UpdateUserStatusService from "@/database/services/admin/update-user-status-service.js";

class UpdateUserStatusController extends BaseController {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const userId = req.params.id as string;
    const { status } = req.body;

    if (!userId) {
      return this.responseHandler(res, 400, "User ID is required");
    }

    try {
      const updateService = new UpdateUserStatusService();
      const updatedUser = await updateService.call({ userId, status });

      if (!updatedUser) {
        return this.responseHandler(res, 404, "User not found");
      }

      // We should omit sensitive data before sending back
      const { password, salt, ...safeUser } = updatedUser;

      return this.responseHandler(
        res,
        200,
        `User ${status ? "activated" : "suspended"} successfully`,
        safeUser,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("User not found")) {
          return this.responseHandler(res, 404, error.message);
        }
      }
      return this.responseHandler(res, 500, "Internal server error");
    }
  }
}

export default UpdateUserStatusController;
