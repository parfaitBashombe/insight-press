import BaseService from "@/database/system/base-service.js";
import { Prisma } from "@/generated/prisma/client.js";
import {
  GetPublicArticlesFilters,
  PaginatedArticles,
} from "@/types/article.js";

class GetPublicArticlesService extends BaseService<
  GetPublicArticlesFilters,
  PaginatedArticles
> {
  protected async transaction(
    filters: GetPublicArticlesFilters,
  ): Promise<PaginatedArticles> {
    const { page, pageSize, search, authorId } = filters;
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where: Prisma.articleWhereInput = {
      status: "PUBLISHED",
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { author: { fullname: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (authorId) {
      where.author_id = authorId;
    }

    const [articles, total] = await Promise.all([
      this.database.article.findMany({
        where,
        skip,
        take,
        include: {
          author: {
            select: {
              fullname: true,
              bio: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          published_at: "desc",
        },
      }),
      this.database.article.count({ where }),
    ]);

    return {
      data: articles,
      total,
      page,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}

export default GetPublicArticlesService;
