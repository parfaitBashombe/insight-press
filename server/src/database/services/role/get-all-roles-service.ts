import BaseService from "@/database/system/base-service.js";
import { type role } from "@/generated/prisma/client.js";

class GetAllRolesService extends BaseService<void, role[]> {
  protected async transaction(): Promise<role[]> {
    return this.database.role.findMany({
      orderBy: { name: "asc" },
    });
  }
}

export default GetAllRolesService;
