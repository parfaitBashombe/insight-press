import CreateArticleController from "@/app/controllers/writer/create-article-controller.js";
import GetArticlesController from "@/app/controllers/writer/get-articles-controller.js";
import GetArticleController from "@/app/controllers/writer/get-article-controller.js";
import UpdateArticleController from "@/app/controllers/writer/update-article-controller.js";
import DeleteArticleController from "@/app/controllers/writer/delete-article-controller.js";
import PublishArticleController from "@/app/controllers/writer/publish-article-controller.js";

const CreateArticle = new CreateArticleController();
const GetArticles = new GetArticlesController();
const GetArticle = new GetArticleController();
const UpdateArticle = new UpdateArticleController();
const DeleteArticle = new DeleteArticleController();
const PublishArticle = new PublishArticleController();

const WriterControllers = {
  CreateArticle,
  GetArticles,
  GetArticle,
  UpdateArticle,
  DeleteArticle,
  PublishArticle,
};

export default WriterControllers;
