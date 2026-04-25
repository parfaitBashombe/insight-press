import CreateArticleValidator from "@/app/validators/article/article-create.js";
import UpdateArticleValidator from "@/app/validators/article/article-update.js";

const Create = new CreateArticleValidator();
const Update = new UpdateArticleValidator();

const ArticleValidators = { Create, Update };

export default ArticleValidators;
