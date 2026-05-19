import FollowWriterController from "@/app/controllers/follow/follow-writer-controller.js";
import UnfollowWriterController from "@/app/controllers/follow/unfollow-writer-controller.js";
import GetFollowStatusController from "@/app/controllers/follow/get-follow-status-controller.js";

const FollowWriter = new FollowWriterController();
const UnfollowWriter = new UnfollowWriterController();
const GetFollowStatus = new GetFollowStatusController();

const FollowControllers = { FollowWriter, UnfollowWriter, GetFollowStatus };

export default FollowControllers;
