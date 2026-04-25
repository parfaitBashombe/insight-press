import { IRoute } from "@/types/app.js";
import UserRoutes from "@/app/routes/user/index.js";
import PromotionRoutes from "@/app/routes/promotion/index.js";
import ProfileRoutes from "@/app/routes/profile/index.js";
import AdminRoutes from "@/app/routes/admin/index.js";

const routes: IRoute[] = [
  ...Object.values({ ...UserRoutes, ...PromotionRoutes, ...ProfileRoutes, ...AdminRoutes }),
];

export default routes;
