import GetArticlesController from "@/app/controllers/reader/get-articles-controller.js";
import GetArticleBySlugController from "@/app/controllers/reader/get-article-by-slug-controller.js";
import GetAuthorProfileController from "@/app/controllers/reader/get-author-profile-controller.js";

const GetArticles = new GetArticlesController();
const GetArticleBySlug = new GetArticleBySlugController();
const GetAuthorProfile = new GetAuthorProfileController();

const ReaderControllers = {
  GetArticles,
  GetArticleBySlug,
  GetAuthorProfile,
};

export default ReaderControllers;
