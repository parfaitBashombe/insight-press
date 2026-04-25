import CreateArticleRoute from "@/app/routes/writer/create-article-route.js";
import GetArticlesRoute from "@/app/routes/writer/get-articles-route.js";
import GetArticleRoute from "@/app/routes/writer/get-article-route.js";
import UpdateArticleRoute from "@/app/routes/writer/update-article-route.js";
import DeleteArticleRoute from "@/app/routes/writer/delete-article-route.js";
import PublishArticleRoute from "@/app/routes/writer/publish-article-route.js";
import UnpublishArticleRoute from "@/app/routes/writer/unpublish-article-route.js";

const PATH = "/writer/articles";

const CreateArticle = new CreateArticleRoute(PATH);
const GetArticles = new GetArticlesRoute(PATH);
const GetArticle = new GetArticleRoute(PATH);
const UpdateArticle = new UpdateArticleRoute(PATH);
const DeleteArticle = new DeleteArticleRoute(PATH);
const PublishArticle = new PublishArticleRoute(PATH);
const UnpublishArticle = new UnpublishArticleRoute(PATH);

const WriterRoutes = {
  CreateArticle,
  GetArticles,
  GetArticle,
  UpdateArticle,
  DeleteArticle,
  PublishArticle,
  UnpublishArticle,
};

export default WriterRoutes;
