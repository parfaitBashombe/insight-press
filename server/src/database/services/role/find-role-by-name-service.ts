import BaseService from "@/database/system/base-service.js";
import { type role } from "@/generated/prisma/client.js";

class FindRoleByNameService extends BaseService<string, role> {
  protected async transaction(name: string): Promise<role | null> {
    return await this.database.role.findUnique({
      where: { name },
    });
  }
}

export default FindRoleByNameService;
