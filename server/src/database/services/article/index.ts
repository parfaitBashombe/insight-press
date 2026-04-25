import CreateArticleService from "@/database/services/article/article-create.js";
import GetArticlesByAuthorService from "@/database/services/article/article-get-all-by-author.js";
import GetArticleByIdService from "@/database/services/article/article-get-one.js";
import UpdateArticleService from "@/database/services/article/article-update.js";
import DeleteArticleService from "@/database/services/article/article-delete.js";
import PublishArticleService from "@/database/services/article/article-publish.js";
import GetPublicArticlesService from "@/database/services/article/get-public-articles-service.js";
import GetPublicArticleBySlugService from "@/database/services/article/get-public-article-by-slug-service.js";

const CreateArticle = new CreateArticleService();
const GetArticlesByAuthor = new GetArticlesByAuthorService();
const GetArticleById = new GetArticleByIdService();
const UpdateArticle = new UpdateArticleService();
const DeleteArticle = new DeleteArticleService();
const PublishArticle = new PublishArticleService();
const GetPublicArticles = new GetPublicArticlesService();
const GetPublicArticleBySlug = new GetPublicArticleBySlugService();

const ArticleServices = {
  CreateArticle,
  GetArticlesByAuthor,
  GetArticleById,
  UpdateArticle,
  DeleteArticle,
  PublishArticle,
  GetPublicArticles,
  GetPublicArticleBySlug,
};

export default ArticleServices;
