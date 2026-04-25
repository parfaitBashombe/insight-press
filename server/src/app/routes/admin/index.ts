import GetAllUsersRoute from "./get-all-users-route.js";
import UpdateUserRoleRoute from "./update-user-role-route.js";
import UpdateUserStatusRoute from "./update-user-status-route.js";
import GetPromotionRequestsRoute from "./get-promotion-requests-route.js";

const PATH = "";

const GetAllUsers = new GetAllUsersRoute(PATH);
const UpdateUserRole = new UpdateUserRoleRoute(PATH);
const UpdateUserStatus = new UpdateUserStatusRoute(PATH);
const GetPromotionRequests = new GetPromotionRequestsRoute(PATH);

export default {
  GetAllUsers,
  UpdateUserRole,
  UpdateUserStatus,
  GetPromotionRequests,
};
