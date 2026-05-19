import FollowWriterRoute from "@/app/routes/follow/follow-writer-route.js";
import UnfollowWriterRoute from "@/app/routes/follow/unfollow-writer-route.js";
import GetFollowStatusRoute from "@/app/routes/follow/get-follow-status-route.js";

const PATH = "/users";

const Follow = new FollowWriterRoute(PATH);
const Unfollow = new UnfollowWriterRoute(PATH);
const FollowStatus = new GetFollowStatusRoute(PATH);

const FollowRoutes = { Follow, Unfollow, FollowStatus };

export default FollowRoutes;
