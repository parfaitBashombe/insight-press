import BaseService from "@/database/system/base-service.js";
import { refresh_token } from "@/generated/prisma/client.js";

class RevokeRefreshTokenService extends BaseService<string, refresh_token> {
  protected async transaction(token: string): Promise<refresh_token | null> {
    return await this.database.refresh_token.delete({
      where: { token },
    });
  }
}

export default RevokeRefreshTokenService;
