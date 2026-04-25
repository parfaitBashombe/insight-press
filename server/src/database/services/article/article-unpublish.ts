import BaseService from "@/database/system/base-service.js";
import { type article } from "@/generated/prisma/client.js";

class UnpublishArticleService extends BaseService<string, article | null> {
  protected async transaction(id: string): Promise<article | null> {
    const article = await this.database.article.findUnique({
      where: { article_id: id },
    });

    if (!article || article.status !== "PUBLISHED") {
      return null;
    }

    return this.database.article.update({
      where: { article_id: id },
      data: {
        status: "DRAFT",
      },
    });
  }
}

export default UnpublishArticleService;
