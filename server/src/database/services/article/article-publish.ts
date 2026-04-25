import BaseService from "@/database/system/base-service.js";
import { type article } from "@/generated/prisma/client.js";

class PublishArticleService extends BaseService<string, article> {
  protected async transaction(id: string): Promise<article | null> {
    const result = await this.database.article.update({
      where: { article_id: id },
      data: {
        status: "PUBLISHED",
        published_at: new Date(),
      },
    });

    return result ?? null;
  }
}

export default PublishArticleService;
