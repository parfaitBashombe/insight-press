import BaseService from "@/database/system/base-service.js";
import { type promotion_request } from "@/generated/prisma/client.js";

class ApprovePromotionService extends BaseService<string, promotion_request> {
  protected async transaction(
    promotionRequestId: string,
  ): Promise<promotion_request | null> {
    const request = await this.database.promotion_request.findUnique({
      where: { promotion_request_id: promotionRequestId },
      include: { role: true },
    });

    if (!request) throw new Error("Promotion request not found.");
    if (request.status !== "PENDING")
      throw new Error(`Request is already ${request.status}`);

    // We do all updates in a transactional block
    const updatedRequest = await this.database.$transaction(async (tx) => {
      // 1. Update the request status
      const updated = await tx.promotion_request.update({
        where: { promotion_request_id: promotionRequestId },
        data: { status: "APPROVED" },
      });

      // 2. Change the User's Role System-wide
      await tx.user.update({
        where: { user_id: request.user_id },
        data: { role_id: request.role_id },
      });

      return updated;
    });

    return updatedRequest;
  }
}

export default ApprovePromotionService;
