import BaseService from "@/database/system/base-service.js";
import { type user } from "@/generated/prisma/client.js";
import type { LogIn } from "@/types/user.js";

class SiginUserService extends BaseService<LogIn, user> {
  protected async transaction(data: LogIn): Promise<user | null> {
    const result = await this.database.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!result) return null;

    const isPassword = this.Password.compare(
      data.password,
      result.password,
      result.salt,
    );

    if (!isPassword) return null;
    return result;
  }
}

export default SiginUserService;
