import BaseService from "@/database/system/base-service.js";
import { type promotion_request } from "@/generated/prisma/client.js";

class RejectPromotionService extends BaseService<string, promotion_request> {
  protected async transaction(
    promotionRequestId: string,
  ): Promise<promotion_request | null> {
    const request = await this.database.promotion_request.findUnique({
      where: { promotion_request_id: promotionRequestId },
    });

    if (!request) throw new Error("Promotion request not found.");
    if (request.status !== "PENDING")
      throw new Error(`Request is already ${request.status}`);

    const updated = await this.database.promotion_request.update({
      where: { promotion_request_id: promotionRequestId },
      data: { status: "REJECTED" },
    });

    return updated;
  }
}

export default RejectPromotionService;
