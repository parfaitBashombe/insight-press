import BaseService from "@/database/system/base-service.js";
import { type user, type role } from "@/generated/prisma/client.js";

type UserWithRole = user & { role: role };

class GetOneUserByIdService extends BaseService<string, UserWithRole> {
  protected async transaction(userId: string): Promise<UserWithRole | null> {
    const result = await this.database.user.findUnique({
      where: { user_id: userId },
      include: { role: true },
    });

    if (!result) return null;
    return result;
  }
}

export default GetOneUserByIdService;
