import BaseService from "@/database/system/base-service.js";

type Input = { followerId: string; followingId: string };

class GetFollowStatusService extends BaseService<Input, boolean> {
  protected async transaction(data: Input): Promise<boolean | null> {
    const { followerId, followingId } = data;

    const record = await this.database.follow.findUnique({
      where: { follower_id_following_id: { follower_id: followerId, following_id: followingId } },
    });

    return record !== null;
  }
}

export default GetFollowStatusService;
