import BaseController from "@/core/base/base-controller.js";
import { Request, Response } from "express";

class MarkAllReadController extends BaseController {
  protected async module(req: Request, res: Response): Promise<void | Response> {
    const userId = req.currentUser!.user_id;

    const result = await this.Service.NotificationServices.MarkAllRead.call(userId);

    return this.responseHandler(res, this.SUCCESS_CODE, this.SUCCESS_MSG, result);
  }
}

export default MarkAllReadController;
