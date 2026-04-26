import GetArticlesRoute from "@/app/routes/reader/get-articles-route.js";
import GetArticleRoute from "@/app/routes/reader/get-article-route.js";
import GetAuthorProfileRoute from "@/app/routes/reader/get-author-profile-route.js";

const PATH = "/articles";

const GetAuthorProfile = new GetAuthorProfileRoute(PATH); // Register BEFORE :slug
const GetArticles = new GetArticlesRoute(PATH);
const GetArticleBySlug = new GetArticleRoute(PATH);

const ReaderRoutes = {
  GetAuthorProfile,
  GetArticles,
  GetArticleBySlug,
};

export default ReaderRoutes;
