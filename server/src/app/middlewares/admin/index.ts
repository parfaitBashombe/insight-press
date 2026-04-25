import IsAdminMiddleware from "@/app/middlewares/admin/is-admin.js";

const IsAdmin = new IsAdminMiddleware();

const AdminMiddleWares = { IsAdmin };

export default AdminMiddleWares;
