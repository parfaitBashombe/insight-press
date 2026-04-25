import UserValidators from "@/app/validators/user/index.js";
import IdValidator from "@/app/validators/validator-id.js";
import ArticleValidators from "@/app/validators/article/index.js";

const Id = new IdValidator();

const Validators = { UserValidators, Id, ArticleValidators };

export default Validators;
