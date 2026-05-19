import UserServices from "@/database/services/user/index.js";
import RefreshTokenServices from "@/database/services/refresh-token/index.js";
import ArticleServices from "@/database/services/article/index.js";
import FollowServices from "@/database/services/follow/index.js";
import NotificationServices from "@/database/services/notification/index.js";

const Services = {
  UserServices,
  RefreshTokenServices,
  ArticleServices,
  FollowServices,
  NotificationServices,
};

export default Services;
