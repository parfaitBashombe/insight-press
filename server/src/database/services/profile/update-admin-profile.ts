import BaseService from "@/database/system/base-service.js";
import { type admin_profile } from "@/generated/prisma/client.js";

interface UpdateAdminProfilePayload {
  userId: string;
  department?: string;
}

class UpdateAdminProfileService extends BaseService<UpdateAdminProfilePayload, admin_profile> {
  protected async transaction(data: UpdateAdminProfilePayload): Promise<admin_profile | null> {
    const existingProfile = await this.database.admin_profile.findUnique({
      where: { user_id: data.userId },
    });

    if (!existingProfile) {
      throw new Error("Admin profile does not exist. Your promotion request must be approved first.");
    }

    return await this.database.admin_profile.update({
      where: { user_id: data.userId },
      data: {
        ...(data.department !== undefined && { department: data.department }),
      },
    });
  }
}

export default UpdateAdminProfileService;
