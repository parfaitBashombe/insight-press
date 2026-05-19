import FollowWriterService from "@/database/services/follow/follow-writer-service.js";
import UnfollowWriterService from "@/database/services/follow/unfollow-writer-service.js";
import GetFollowStatusService from "@/database/services/follow/get-follow-status-service.js";

const FollowWriter = new FollowWriterService();
const UnfollowWriter = new UnfollowWriterService();
const GetFollowStatus = new GetFollowStatusService();

const FollowServices = { FollowWriter, UnfollowWriter, GetFollowStatus };

export default FollowServices;
