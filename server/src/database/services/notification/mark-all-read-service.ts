import BaseService from "@/database/system/base-service.js";

class MarkAllReadService extends BaseService<string, { count: number }> {
  protected async transaction(userId: string): Promise<{ count: number } | null> {
    const result = await this.database.notification.updateMany({
      where: { user_id: userId, read: false },
      data: { read: true },
    });

    return { count: result.count };
  }
}

export default MarkAllReadService;
