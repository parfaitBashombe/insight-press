import BaseController from "@/core/base/base-controller.js";
import { Request, Response } from "express";

class FollowWriterController extends BaseController {
  protected async module(req: Request, res: Response): Promise<void | Response> {
    const followerId = req.currentUser!.user_id;
    const followingId = req.params.id as string;

    if (followerId === followingId) {
      return this.responseHandler(res, this.BAD_REQUEST_CODE, "Cannot follow yourself");
    }

    const result = await this.Service.FollowServices.FollowWriter.call({
      followerId,
      followingId,
    });

    if (!result) {
      return this.responseHandler(res, this.NOT_FOUND_CODE, this.NOT_FOUND_MSG);
    }

    return this.responseHandler(res, this.SUCCESS_CODE, "Following", result);
  }
}

export default FollowWriterController;
