import RequestPromotionRoute from "@/app/routes/promotion/request-promotion-route.js";
import ApprovePromotionRoute from "@/app/routes/promotion/approve-promotion-route.js";
import RejectPromotionRoute from "@/app/routes/promotion/reject-promotion-route.js";

const PATH = "";

const RequestPromotion = new RequestPromotionRoute(PATH);
const ApprovePromotion = new ApprovePromotionRoute(PATH);
const RejectPromotion = new RejectPromotionRoute(PATH);

export default {
  RequestPromotion,
  ApprovePromotion,
  RejectPromotion,
};
