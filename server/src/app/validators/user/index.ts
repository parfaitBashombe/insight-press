import SignupUserValidator from "@/app/validators/user/user-create.js";
import SignInUserValidator from "@/app/validators/user/user-login.js";
import UpdateUserValidator from "@/app/validators/user/user-update.js";
import ChangePasswordValidator from "@/app/validators/user/change-password.js";
import ForgotPasswordValidator from "@/app/validators/user/forgot-password.js";
import ResetPasswordValidator from "@/app/validators/user/reset-password.js";

const Signup = new SignupUserValidator();
const SignIn = new SignInUserValidator();
const Update = new UpdateUserValidator();
const ChangePassword = new ChangePasswordValidator();
const ForgotPassword = new ForgotPasswordValidator();
const ResetPassword = new ResetPasswordValidator();

const UserValidators = {
  Signup,
  SignIn,
  Update,
  ChangePassword,
  ForgotPassword,
  ResetPassword,
};

export default UserValidators;
