import BaseService from "@/database/system/base-service.js";
import { type article } from "@/generated/prisma/client.js";

class GetPublicArticleBySlugService extends BaseService<
  string,
  article | null
> {
  protected async transaction(slug: string): Promise<article | null> {
    return this.database.article.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
      },
      include: {
        author: {
          select: {
            user_id: true,
            fullname: true,
            bio: true,
            department: true,
            twitter: true,
            avatar: true,
          },
        },
      },
    });
  }
}

export default GetPublicArticleBySlugService;
