import BaseService from "@/database/system/base-service.js";
import { type article } from "@/generated/prisma/client.js";

class PublishArticleService extends BaseService<string, article> {
  protected async transaction(id: string): Promise<article | null> {
    const existing = await this.database.article.findUnique({
      where: { article_id: id },
      select: { article_id: true, title: true, slug: true, author_id: true, status: true },
    });

    if (!existing) return null;

    const published = await this.database.article.update({
      where: { article_id: id },
      data: { status: "PUBLISHED", published_at: new Date() },
    });

    if (existing.status !== "PUBLISHED") {
      const author = await this.database.user.findUnique({
        where: { user_id: existing.author_id },
        select: { fullname: true },
      });

      const followers = await this.database.follow.findMany({
        where: { following_id: existing.author_id },
        select: { follower_id: true },
      });

      if (followers.length > 0 && author) {
        await this.database.notification.createMany({
          data: followers.map((f) => ({
            user_id: f.follower_id,
            type: "NEW_ARTICLE" as const,
            title: `New article from ${author.fullname}`,
            body: existing.title,
            article_id: existing.article_id,
            article_slug: existing.slug,
          })),
        });
      }
    }

    return published;
  }
}

export default PublishArticleService;
