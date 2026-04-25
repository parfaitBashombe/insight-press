import BaseService from "@/database/system/base-service.js";
import { type article } from "@/generated/prisma/client.js";
import { UpdateArticle } from "@/types/article.js";

type UpdateArticleInput = UpdateArticle & { articleId: string };

class UpdateArticleService extends BaseService<UpdateArticleInput, article> {
  protected async transaction(
    data: UpdateArticleInput,
  ): Promise<article | null> {
    const result = await this.database.article.update({
      where: { article_id: data.articleId },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.cover_image !== undefined && {
          cover_image: data.cover_image,
        }),
      },
    });

    return result ?? null;
  }
}

export default UpdateArticleService;
