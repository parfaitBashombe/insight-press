import BaseService from "@/database/system/base-service.js";
import { user } from "@/generated/prisma/client.js";
import { UserUpdate } from "@/types/user.js";

type UpdatePayload = UserUpdate & { user_id: string };

class UpdateUserService extends BaseService<UpdatePayload, user> {
  protected async transaction(data: UpdatePayload): Promise<user | null> {
    const { user_id, ...fields } = data;

    const result = await this.database.user.update({
      where: { user_id },
      data: fields,
    });

    if (!result) return null;
    return result;
  }
}

export default UpdateUserService;
