import BaseService from "@/database/system/base-service.js";
import { ChangePassword } from "@/types/user.js";
import PasswordUtils from "@/core/utils/password-utils.js";
import { type user } from "@/generated/prisma/client.js";

type ChangePasswordPayload = ChangePassword & { userId: string };

class ChangePasswordService extends BaseService<
  ChangePasswordPayload,
  user | { error: string }
> {
  protected async transaction(
    payload: ChangePasswordPayload,
  ): Promise<user | { error: string }> {
    const { userId, oldPassword, newPassword } = payload;

    const user = await this.database.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const passwordUtils = new PasswordUtils();

    // Verify old password
    const isMatch = passwordUtils.compare(
      oldPassword,
      user.password,
      user.salt,
    );
    if (!isMatch) {
      return { error: "Incorrect old password" };
    }

    // Hash new password
    const newSalt = passwordUtils.salt();
    const newHashedPassword = passwordUtils.hash(newPassword, newSalt);

    const updatedUser = await this.database.user.update({
      where: { user_id: userId },
      data: {
        password: newHashedPassword,
        salt: newSalt,
      },
    });

    return updatedUser;
  }
}

export default ChangePasswordService;
