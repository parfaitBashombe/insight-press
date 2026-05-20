import BaseService from "@/database/system/base-service.js";
import { type article } from "@/generated/prisma/client.js";
import { ArticlePage, PaginatedArticles } from "@/types/article.js";

class GetArticlesByAuthorService extends BaseService<ArticlePage, PaginatedArticles> {
  protected async transaction(data: ArticlePage): Promise<PaginatedArticles> {
    const { skip, take } = this.cursor({
      page: data.page,
      pageSize: data.pageSize,
    });

    const [results, total] = await Promise.all([
      this.database.article.findMany({
        where: { author_id: data.authorId },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      this.database.article.count({
        where: { author_id: data.authorId },
      }),
    ]);

    return {
      data: results as article[],
      total,
      page: data.page,
      totalPages: Math.ceil(total / data.pageSize),
    };
  }
}

export default GetArticlesByAuthorService;
