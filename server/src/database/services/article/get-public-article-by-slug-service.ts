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
            fullname: true,
            bio: true,
            department: true,
            twitter: true,
          },
        },
      },
    });
  }
}

export default GetPublicArticleBySlugService;
