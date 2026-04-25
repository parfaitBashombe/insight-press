import BaseService from "@/database/system/base-service.js";
import { type promotion_request } from "@/generated/prisma/client.js";

class FindPendingRequestService extends BaseService<string, promotion_request> {
  protected async transaction(
    userId: string,
  ): Promise<promotion_request | null> {
    return await this.database.promotion_request.findFirst({
      where: {
        user_id: userId,
        status: "PENDING",
      },
    });
  }
}

export default FindPendingRequestService;
