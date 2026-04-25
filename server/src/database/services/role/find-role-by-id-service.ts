import BaseService from "@/database/system/base-service.js";
import { type role } from "@/generated/prisma/client.js";

class FindRoleByIdService extends BaseService<string, role> {
  protected async transaction(roleId: string): Promise<role | null> {
    return await this.database.role.findUnique({
      where: { role_id: roleId },
    });
  }
}

export default FindRoleByIdService;
