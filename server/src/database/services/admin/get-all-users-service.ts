import BaseService from "@/database/system/base-service.js";
import { type user } from "@/generated/prisma/client.js";

// We return a list of users, omitting sensitive fields
type UserWithoutPassword = Omit<user, "password" | "salt">;

class GetAllUsersService extends BaseService<void, UserWithoutPassword[]> {
  protected async transaction(): Promise<UserWithoutPassword[]> {
    const users = await this.database.user.findMany({
      include: {
        role: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return users.map((u) => {
      const { password, salt, ...userWithoutSensitiveData } = u;
      return userWithoutSensitiveData;
    });
  }
}

export default GetAllUsersService;
