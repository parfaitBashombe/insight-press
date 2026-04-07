import BaseService from "@/database/system/base-service.js";
import { refresh_token } from "@/generated/prisma/client.js";

class FindRefreshTokenService extends BaseService<string, refresh_token> {
  protected async transaction(token: string): Promise<refresh_token | null> {
    return await this.database.refresh_token.findUnique({
      where: { token },
    });
  }
}

export default FindRefreshTokenService;
