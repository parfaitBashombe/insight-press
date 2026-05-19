import BaseController from "@/core/base/base-controller.js";
import { Request, Response } from "express";

class UnfollowWriterController extends BaseController {
  protected async module(req: Request, res: Response): Promise<void | Response> {
    const followerId = req.currentUser!.user_id;
    const followingId = req.params.id as string;

    const result = await this.Service.FollowServices.UnfollowWriter.call({
      followerId,
      followingId,
    });

    if (!result) {
      return this.responseHandler(res, this.NOT_FOUND_CODE, "Not following this writer");
    }

    return this.responseHandler(res, this.SUCCESS_CODE, "Unfollowed");
  }
}

export default UnfollowWriterController;
