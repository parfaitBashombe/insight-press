import BaseService from "@/database/system/base-service.js";
import { type article } from "@/generated/prisma/client.js";

class DeleteArticleService extends BaseService<string, article> {
  protected async transaction(id: string): Promise<article | null> {
    const result = await this.database.article.delete({
      where: { article_id: id },
    });

    return result ?? null;
  }
}

export default DeleteArticleService;
