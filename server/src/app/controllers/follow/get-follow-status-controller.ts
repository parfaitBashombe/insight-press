import BaseController from "@/core/base/base-controller.js";
import { Request, Response } from "express";

class GetFollowStatusController extends BaseController {
  protected async module(req: Request, res: Response): Promise<void | Response> {
    const followerId = req.currentUser!.user_id;
    const followingId = req.params.id as string;

    const following = await this.Service.FollowServices.GetFollowStatus.call({
      followerId,
      followingId,
    });

    return this.responseHandler(res, this.SUCCESS_CODE, this.SUCCESS_MSG, {
      following: following ?? false,
    });
  }
}

export default GetFollowStatusController;
