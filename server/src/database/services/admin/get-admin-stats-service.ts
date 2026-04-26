import BaseService from "@/database/system/base-service.js";

type AdminStatsResponse = {
  users: { total: number; active: number; suspended: number };
  articles: { total: number; published: number; drafts: number };
  promotionRequests: { pending: number };
};

class GetAdminStatsService extends BaseService<void, AdminStatsResponse> {
  protected async transaction(): Promise<AdminStatsResponse> {
    const [
      totalUsers,
      activeUsers,
      totalArticles,
      publishedArticles,
      pendingRequests,
    ] = await Promise.all([
      this.database.user.count(),
      this.database.user.count({ where: { status: true } }),
      this.database.article.count(),
      this.database.article.count({ where: { status: "PUBLISHED" } }),
      this.database.promotion_request.count({ where: { status: "PENDING" } }),
    ]);

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        suspended: totalUsers - activeUsers,
      },
      articles: {
        total: totalArticles,
        published: publishedArticles,
        drafts: totalArticles - publishedArticles,
      },
      promotionRequests: {
        pending: pendingRequests,
      },
    };
  }
}

export default GetAdminStatsService;
