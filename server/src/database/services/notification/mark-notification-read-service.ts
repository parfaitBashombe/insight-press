import BaseService from "@/database/system/base-service.js";
import { type notification } from "@/generated/prisma/client.js";

type Input = { notificationId: string; userId: string };

class MarkNotificationReadService extends BaseService<Input, notification> {
  protected async transaction(data: Input): Promise<notification | null> {
    const { notificationId, userId } = data;

    const record = await this.database.notification.findFirst({
      where: { notification_id: notificationId, user_id: userId },
    });

    if (!record) return null;

    return await this.database.notification.update({
      where: { notification_id: notificationId },
      data: { read: true },
    });
  }
}

export default MarkNotificationReadService;
