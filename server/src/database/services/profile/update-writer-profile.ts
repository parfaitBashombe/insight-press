import BaseService from "@/database/system/base-service.js";
import { type writer_profile } from "@/generated/prisma/client.js";

interface UpdateWriterProfilePayload {
  userId: string;
  bio?: string;
  twitter?: string;
}

class UpdateWriterProfileService extends BaseService<UpdateWriterProfilePayload, writer_profile> {
  protected async transaction(data: UpdateWriterProfilePayload): Promise<writer_profile | null> {
    const existingProfile = await this.database.writer_profile.findUnique({
      where: { user_id: data.userId },
    });

    if (!existingProfile) {
      throw new Error("Writer profile does not exist. Your promotion request must be approved first.");
    }

    return await this.database.writer_profile.update({
      where: { user_id: data.userId },
      data: {
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.twitter !== undefined && { twitter: data.twitter }),
      },
    });
  }
}

export default UpdateWriterProfileService;
