import BaseService from "@/database/system/base-service.js";
import { type article } from "@/generated/prisma/client.js";
import { ArticlePage } from "@/types/article.js";

class GetArticlesByAuthorService extends BaseService<ArticlePage, article[]> {
  protected async transaction(data: ArticlePage): Promise<article[] | null> {
    const { skip, take } = this.cursor({
      page: data.page,
      pageSize: data.pageSize,
    });

    const results = await this.database.article.findMany({
      where: { author_id: data.authorId },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });

    return results ?? null;
  }
}

export default GetArticlesByAuthorService;
