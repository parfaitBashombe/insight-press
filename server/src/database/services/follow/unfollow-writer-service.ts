import BaseService from "@/database/system/base-service.js";
import { type follow } from "@/generated/prisma/client.js";

type Input = { followerId: string; followingId: string };

class UnfollowWriterService extends BaseService<Input, follow> {
  protected async transaction(data: Input): Promise<follow | null> {
    const { followerId, followingId } = data;

    const existing = await this.database.follow.findUnique({
      where: { follower_id_following_id: { follower_id: followerId, following_id: followingId } },
    });

    if (!existing) return null;

    return await this.database.follow.delete({
      where: { follower_id_following_id: { follower_id: followerId, following_id: followingId } },
    });
  }
}

export default UnfollowWriterService;
