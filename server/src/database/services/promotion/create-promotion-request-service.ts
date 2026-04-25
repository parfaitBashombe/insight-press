import BaseService from "@/database/system/base-service.js";
import { type promotion_request } from "@/generated/prisma/client.js";

interface CreatePromotionRequestPayload {
  userId: string;
  roleId: string;
  reason: string;
}

class CreatePromotionRequestService extends BaseService<
  CreatePromotionRequestPayload,
  promotion_request
> {
  protected async transaction(
    data: CreatePromotionRequestPayload,
  ): Promise<promotion_request | null> {
    return await this.database.promotion_request.create({
      data: {
        user_id: data.userId,
        role_id: data.roleId,
        reason: data.reason,
      },
    });
  }
}

export default CreatePromotionRequestService;
