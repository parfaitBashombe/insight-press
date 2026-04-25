import BaseService from "@/database/system/base-service.js";
import { type promotion_request } from "@/generated/prisma/client.js";

class GetPromotionRequestsService extends BaseService<
  void,
  promotion_request[]
> {
  protected async transaction(): Promise<promotion_request[]> {
    const requests = await this.database.promotion_request.findMany({
      include: {
        user: {
          select: {
            user_id: true,
            fullname: true,
            email: true,
            status: true,
            role: true, // Current role
          },
        },
        role: true, // Requested role
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return requests;
  }
}

export default GetPromotionRequestsService;
