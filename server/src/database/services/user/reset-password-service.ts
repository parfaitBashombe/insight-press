import BaseService from "@/database/system/base-service.js";
import PasswordUtils from "@/core/utils/password-utils.js";

type ResetPasswordPayload = { token: string; newPassword: string };
type ResetPasswordResult = { success: true } | { error: string };

class ResetPasswordService extends BaseService<
  ResetPasswordPayload,
  ResetPasswordResult
> {
  protected async transaction(
    payload: ResetPasswordPayload,
  ): Promise<ResetPasswordResult> {
    const { token, newPassword } = payload;

    const resetToken = await this.database.password_reset_token.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken) {
      return { error: "Invalid or expired reset token" };
    }

    if (resetToken.expiresAt < new Date()) {
      await this.database.password_reset_token.delete({
        where: { token },
      });
      return { error: "Reset token has expired. Please request a new one." };
    }

    const passwordUtils = new PasswordUtils();
    const newSalt = passwordUtils.salt();
    const hashedPassword = passwordUtils.hash(newPassword, newSalt);

    await this.database.user.update({
      where: { user_id: resetToken.user_id },
      data: { password: hashedPassword, salt: newSalt },
    });

    // Delete the used token
    await this.database.password_reset_token.delete({ where: { token } });

    return { success: true };
  }
}

export default ResetPasswordService;
