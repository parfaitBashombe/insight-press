import BaseService from "@/database/system/base-service.js";
import { type follow } from "@/generated/prisma/client.js";

type Input = { followerId: string; followingId: string };

class FollowWriterService extends BaseService<Input, follow> {
  protected async transaction(data: Input): Promise<follow | null> {
    const { followerId, followingId } = data;

    if (followerId === followingId) return null;

    const existing = await this.database.follow.findUnique({
      where: { follower_id_following_id: { follower_id: followerId, following_id: followingId } },
    });

    if (existing) return existing;

    return await this.database.follow.create({
      data: { follower_id: followerId, following_id: followingId },
    });
  }
}

export default FollowWriterService;
