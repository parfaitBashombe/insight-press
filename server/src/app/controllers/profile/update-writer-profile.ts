import { Request, Response } from "express";
import BaseControlller from "@/core/base/base-controller.js";
import UpdateWriterProfileService from "@/database/services/profile/update-writer-profile.js";

class UpdateWriterProfileController extends BaseControlller {
  protected async module(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const user = req.currentUser;
    const { bio, twitter } = req.body;

    if (!user) {
      return this.responseHandler(res, 401, "You are not authenticated.");
    }

    try {
      const updateService = new UpdateWriterProfileService();

      const updatedProfile = await updateService.call({
        userId: user.user_id,
        bio,
        twitter,
      });

      if (!updatedProfile) {
        return this.responseHandler(
          res,
          500,
          "Failed to update writer profile.",
        );
      }

      return this.responseHandler(
        res,
        200,
        "Writer profile updated successfully.",
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

export default UpdateWriterProfileController;
