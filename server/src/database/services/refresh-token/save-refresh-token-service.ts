import BaseService from "@/database/system/base-service.js";
import { type refresh_token } from "@/generated/prisma/client.js";

interface SaveRefreshTokenInput {
  userId: string;
  token: string;
}

class SaveRefreshTokenService extends BaseService<
  SaveRefreshTokenInput,
  refresh_token
> {
  protected async transaction(
    data: SaveRefreshTokenInput,
  ): Promise<refresh_token | null> {
    return await this.database.refresh_token.create({
      data: {
        token: data.token,
        user_id: data.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }
}

export default SaveRefreshTokenService;
