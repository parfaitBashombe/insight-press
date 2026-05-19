import BaseService from "@/database/system/base-service.js";
import { type notification } from "@/generated/prisma/client.js";

class GetNotificationsService extends BaseService<string, notification[]> {
  protected async transaction(userId: string): Promise<notification[] | null> {
    return await this.database.notification.findMany({
      where: { user_id: userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }
}

export default GetNotificationsService;
