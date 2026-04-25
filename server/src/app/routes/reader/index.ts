import GetArticlesRoute from "@/app/routes/reader/get-articles-route.js";
import GetArticleRoute from "@/app/routes/reader/get-article-route.js";

const PATH = "/articles";

const GetArticles = new GetArticlesRoute(PATH);
const GetArticleBySlug = new GetArticleRoute(PATH);

const ReaderRoutes = {
  GetArticles,
  GetArticleBySlug,
};

export default ReaderRoutes;
