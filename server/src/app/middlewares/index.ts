import UserMiddleWares from "@/app/middlewares/user/index.js";
import AdminMiddleWares from "@/app/middlewares/admin/index.js";
import WriterMiddleWares from "@/app/middlewares/writer/index.js";

const MiddleWares = { UserMiddleWares, AdminMiddleWares, WriterMiddleWares };

export default MiddleWares;
