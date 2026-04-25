import BaseService from "@/database/system/base-service.js";
import { type user } from "@/generated/prisma/client.js";

type UpdateUserRoleParams = {
  userId: string;
  roleId: string;
};

class UpdateUserRoleService extends BaseService<UpdateUserRoleParams, user> {
  protected async transaction(params: UpdateUserRoleParams): Promise<user> {
    const { userId, roleId } = params;

    const user = await this.database.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const role = await this.database.role.findUnique({
      where: { role_id: roleId },
    });

    if (!role) {
      throw new Error("Role not found");
    }

    const updatedUser = await this.database.user.update({
      where: { user_id: userId },
      data: { role_id: roleId },
      include: { role: true },
    });

    return updatedUser;
  }
}

export default UpdateUserRoleService;
