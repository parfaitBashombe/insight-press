import BaseService from "@/database/system/base-service.js";

type WriterStatsResponse = {
  articles: { total: number; published: number; drafts: number };
};

class GetWriterStatsService extends BaseService<string, WriterStatsResponse> {
  protected async transaction(authorId: string): Promise<WriterStatsResponse> {
    const [total, published, drafts] = await Promise.all([
      this.database.article.count({ where: { author_id: authorId } }),
      this.database.article.count({
        where: { author_id: authorId, status: "PUBLISHED" },
      }),
      this.database.article.count({
        where: { author_id: authorId, status: "DRAFT" },
      }),
    ]);

    return {
      articles: { total, published, drafts },
    };
  }
}

export default GetWriterStatsService;
