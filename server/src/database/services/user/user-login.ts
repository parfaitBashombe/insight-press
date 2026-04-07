import BaseService from "@/database/system/base-service.js";
import { type user, type role } from "@/generated/prisma/client.js";
import type { LogIn } from "@/types/user.js";

type UserWithRole = user & { role: role };

class SigninUserService extends BaseService<LogIn, UserWithRole> {
  protected async transaction(data: LogIn): Promise<UserWithRole | null> {
    const result = await this.database.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        role: true,
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

export default SigninUserService;
