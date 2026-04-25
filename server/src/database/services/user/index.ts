import CreateUserService from "@/database/services/user/user-create.js";
import GetOneUserByEmailService from "@/database/services/user/user-get-one-by-email.js";
import SigninUserService from "@/database/services/user/user-login.js";
import UpdateUserService from "@/database/services/user/user-update.js";
import ChangePasswordService from "@/database/services/user/user-change-password.js";

const CreateUser = new CreateUserService();
const GetUserByEmail = new GetOneUserByEmailService();
const SignInUser = new SigninUserService();
const UpdateUser = new UpdateUserService();
const ChangePassword = new ChangePasswordService();

const UserServices = {
  CreateUser,
  GetUserByEmail,
  SignInUser,
  UpdateUser,
  ChangePassword,
};

export default UserServices;
