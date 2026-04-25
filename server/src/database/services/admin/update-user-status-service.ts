import BaseService from "@/database/system/base-service.js";
import { type user } from "@/generated/prisma/client.js";

type UpdateUserStatusParams = {
  userId: string;
  status: boolean;
};

class UpdateUserStatusService extends BaseService<
  UpdateUserStatusParams,
  user
> {
  protected async transaction(params: UpdateUserStatusParams): Promise<user> {
    const { userId, status } = params;

    const user = await this.database.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await this.database.user.update({
      where: { user_id: userId },
      data: { status },
      include: { role: true },
    });

    return updatedUser;
  }
}

export default UpdateUserStatusService;
