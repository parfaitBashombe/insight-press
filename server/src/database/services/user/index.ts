import CreateUserService from "@/database/services/user/user-create.js";
import GetOneUserByEmailService from "@/database/services/user/user-get-one-by-email.js";
import SigninUserService from "@/database/services/user/user-login.js";
import UpdateUserService from "@/database/services/user/user-update.js";
import ChangePasswordService from "@/database/services/user/user-change-password.js";
import ForgotPasswordService from "@/database/services/user/forgot-password-service.js";
import ResetPasswordService from "@/database/services/user/reset-password-service.js";

const CreateUser = new CreateUserService();
const GetUserByEmail = new GetOneUserByEmailService();
const SignInUser = new SigninUserService();
const UpdateUser = new UpdateUserService();
const ChangePassword = new ChangePasswordService();
const ForgotPassword = new ForgotPasswordService();
const ResetPassword = new ResetPasswordService();

const UserServices = {
  CreateUser,
  GetUserByEmail,
  SignInUser,
  UpdateUser,
  ChangePassword,
  ForgotPassword,
  ResetPassword,
};

export default UserServices;
