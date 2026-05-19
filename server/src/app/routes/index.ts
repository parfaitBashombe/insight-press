import { IRoute } from "@/types/app.js";
import UserRoutes from "@/app/routes/user/index.js";
import PromotionRoutes from "@/app/routes/promotion/index.js";
import ProfileRoutes from "@/app/routes/profile/index.js";
import AdminRoutes from "@/app/routes/admin/index.js";
import WriterRoutes from "@/app/routes/writer/index.js";
import ReaderRoutes from "@/app/routes/reader/index.js";
import MediaRoutes from "@/app/routes/media/index.js";
import FollowRoutes from "@/app/routes/follow/index.js";
import NotificationRoutes from "@/app/routes/notification/index.js";

const routes: IRoute[] = [
  ...Object.values({
    ...UserRoutes,
    ...PromotionRoutes,
    ...ProfileRoutes,
    ...AdminRoutes,
    ...WriterRoutes,
    ...ReaderRoutes,
    ...MediaRoutes,
    ...FollowRoutes,
    ...NotificationRoutes,
  }),
];

export default routes;
