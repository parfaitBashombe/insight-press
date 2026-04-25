import GetArticlesController from "@/app/controllers/reader/get-articles-controller.js";
import GetArticleBySlugController from "@/app/controllers/reader/get-article-by-slug-controller.js";

const GetArticles = new GetArticlesController();
const GetArticleBySlug = new GetArticleBySlugController();

const ReaderControllers = {
  GetArticles,
  GetArticleBySlug,
};

export default ReaderControllers;
