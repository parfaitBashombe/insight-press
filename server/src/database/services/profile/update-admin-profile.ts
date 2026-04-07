import BaseService from "@/database/system/base-service.js";
import { type user } from "@/generated/prisma/client.js";

interface UpdateAdminProfilePayload {
  userId: string;
  department?: string;
}

class UpdateAdminProfileService extends BaseService<
  UpdateAdminProfilePayload,
  user
> {
  protected async transaction(
    data: UpdateAdminProfilePayload,
  ): Promise<user | null> {
    const existingProfile = await this.database.user.findUnique({
      where: { user_id: data.userId },
    });

    if (!existingProfile) {
      throw new Error("User does not exist.");
    }

    return await this.database.user.update({
      where: { user_id: data.userId },
      data: {
        ...(data.department !== undefined && { department: data.department }),
      },
    });
  }
}

export default UpdateAdminProfileService;
