import { Request, Response } from "express";
import BaseControlller from "@/core/base/base-controller.js";
import { CreatePromotionRequest } from "@/types/promotion.js";
import FindRoleByNameService from "@/database/services/role/find-role-by-name-service.js";
import CreatePromotionRequestService from "@/database/services/promotion/create-promotion-request-service.js";

class RequestPromotionController extends BaseControlller {
  protected async module(
    req: Request,
    res: Response
  ): Promise<void | Response> {
    const data: CreatePromotionRequest = req.body;
    const user = req.currentUser;

    if (!user) {
      return this.responseHandler(res, 401, "You are not authenticated.");
    }

    try {
      const findRoleService = new FindRoleByNameService();
      const createRequestService = new CreatePromotionRequestService();

      // Look up the requested role to get its ID
      const role = await findRoleService.call(data.requested_role);

      if (!role) {
        return this.responseHandler(res, 404, `Role '${data.requested_role}' not found.`);
      }

      // Check if user already holds this role
      if (user.role_id === role.role_id) {
        return this.responseHandler(res, 400, `You are already assigned the ${data.requested_role} role.`);
      }

      // Create the promotion request
      const request = await createRequestService.call({
        userId: user.user_id,
        roleId: role.role_id,
        reason: data.reason
      });

      if (!request) {
        return this.responseHandler(
          res,
          500,
          "An error occurred while creating the promotion request"
        );
      }

      return this.responseHandler(
        res,
        201,
        "Promotion request submitted successfully and is pending review.",
        request
      );
    } catch (error: any) {
      return this.responseHandler(res, 500, "Internal server error");
    }
  }
}

export default RequestPromotionController;
