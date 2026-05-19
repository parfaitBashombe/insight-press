import BaseController from "@/core/base/base-controller.js";
import { Request, Response } from "express";

class MarkNotificationReadController extends BaseController {
  protected async module(req: Request, res: Response): Promise<void | Response> {
    const userId = req.currentUser!.user_id;
    const notificationId = req.params.id as string;

    const result = await this.Service.NotificationServices.MarkNotificationRead.call({
      notificationId,
      userId,
    });

    if (!result) {
      return this.responseHandler(res, this.NOT_FOUND_CODE, this.NOT_FOUND_MSG);
    }

    return this.responseHandler(res, this.SUCCESS_CODE, this.SUCCESS_MSG, result);
  }
}

export default MarkNotificationReadController;
