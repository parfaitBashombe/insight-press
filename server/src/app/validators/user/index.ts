import SignupUserValidator from "@/app/validators/user/user-create.js";
import SignInUserValidator from "@/app/validators/user/user-login.js";
import UpdateUserValidator from "@/app/validators/user/user-update.js";
import ChangePasswordValidator from "@/app/validators/user/change-password.js";

const Signup = new SignupUserValidator();
const SignIn = new SignInUserValidator();
const Update = new UpdateUserValidator();
const ChangePassword = new ChangePasswordValidator();

const UserValidators = { Signup, SignIn, Update, ChangePassword };

export default UserValidators;
