import { Request, Response } from "express";
import BaseControlller from "@/core/base/base-controller.js";
import UpdateAdminProfileService from "@/database/services/profile/update-admin-profile.js";

class UpdateAdminProfileController extends BaseControlller {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const user = req.currentUser;
    const { department } = req.body;

    if (!user) {
      return this.responseHandler(res, 401, "You are not authenticated.");
    }

    try {
      const updateService = new UpdateAdminProfileService();

      const updatedProfile = await updateService.call({
        userId: user.user_id,
        department,
      });

      if (!updatedProfile) {
        return this.responseHandler(
          res,
          500,
          "Failed to update admin profile.",
        );
      }

      return this.responseHandler(
        res,
        200,
        "Admin profile updated successfully.",
        updatedProfile,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("does not exist")) {
          return this.responseHandler(res, 404, error.message);
        }
      }
      return this.responseHandler(res, 500, "Internal server error");
    }
  }
}

export default UpdateAdminProfileController;
