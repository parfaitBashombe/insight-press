import BaseService from "@/database/system/base-service.js";
import { user } from "@/generated/prisma/client.js";

class GetOneUserByEmailService extends BaseService<string, user> {
  protected async transaction(email: string): Promise<user | null> {
    const result = await this.database.user.findUnique({
      where: { email },
    });

    if (!result) return null;

    return result;
  }
}

export default GetOneUserByEmailService;
