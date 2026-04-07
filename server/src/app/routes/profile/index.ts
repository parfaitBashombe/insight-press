import WriterProfileRoute from "@/app/routes/profile/writer-profile-route.js";
import AdminProfileRoute from "@/app/routes/profile/admin-profile-route.js";

const PATH = "";

const WriterProfile = new WriterProfileRoute(PATH);
const AdminProfile = new AdminProfileRoute(PATH);

export default {
  WriterProfile,
  AdminProfile,
};
