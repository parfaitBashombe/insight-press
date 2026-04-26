import CreateUserRoute from "@/app/routes/user/user-create.js";
import SignInUserRoute from "@/app/routes/user/user-login.js";
import UpdateUserRoute from "@/app/routes/user/user-update.js";
import GetUserRoute from "@/app/routes/user/get-user-route.js";
import RefreshTokenRoute from "@/app/routes/user/refresh-token-route.js";
import LogOutRoute from "@/app/routes/user/logout-route.js";
import ChangePasswordRoute from "@/app/routes/user/change-password-route.js";
import ForgotPasswordRoute from "@/app/routes/user/forgot-password-route.js";
import ResetPasswordRoute from "@/app/routes/user/reset-password-route.js";

const PATH = "/auth/";

const CreateUser = new CreateUserRoute(PATH);
const SignInUser = new SignInUserRoute(PATH);
const UpdateUser = new UpdateUserRoute(PATH);
const GetUser = new GetUserRoute(PATH);
const RefreshToken = new RefreshTokenRoute(PATH);
const LogOut = new LogOutRoute(PATH);
const ChangePassword = new ChangePasswordRoute(PATH);
const ForgotPassword = new ForgotPasswordRoute(PATH);
const ResetPassword = new ResetPasswordRoute(PATH);

const UserRoutes = {
  CreateUser,
  SignInUser,
  UpdateUser,
  GetUser,
  RefreshToken,
  LogOut,
  ChangePassword,
  ForgotPassword,
  ResetPassword,
};

export default UserRoutes;
