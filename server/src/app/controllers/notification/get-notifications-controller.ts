import BaseController from "@/core/base/base-controller.js";
import { Request, Response } from "express";

class GetNotificationsController extends BaseController {
  protected async module(req: Request, res: Response): Promise<void | Response> {
    const userId = req.currentUser!.user_id;

    const notifications = await this.Service.NotificationServices.GetNotifications.call(userId);

    const unreadCount = (notifications ?? []).filter((n) => !n.read).length;

    return this.responseHandler(res, this.SUCCESS_CODE, this.SUCCESS_MSG, {
      notifications: notifications ?? [],
      unreadCount,
    });
  }
}

export default GetNotificationsController;
