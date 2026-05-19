import BaseService from "@/database/system/base-service.js";
import { type article } from "@/generated/prisma/client.js";

type AuthorInfo = {
  user_id: string;
  fullname: string;
  bio: string | null;
  twitter: string | null;
  department: string | null;
  createdAt: Date;
  followerCount: number;
};

type PublicAuthorProfile = {
  author: AuthorInfo;
  articles: article[];
  total: number;
};

class GetPublicAuthorProfileService extends BaseService<string, PublicAuthorProfile | null> {
  protected async transaction(authorId: string): Promise<PublicAuthorProfile | null> {
    const author = await this.database.user.findUnique({
      where: { user_id: authorId },
      select: {
        user_id: true,
        fullname: true,
        bio: true,
        twitter: true,
        department: true,
        createdAt: true,
        articles: {
          where: { status: "PUBLISHED" },
          orderBy: { published_at: "desc" },
        },
        _count: { select: { followers: true } },
      },
    });

    if (!author) return null;

    return {
      author: {
        user_id: author.user_id,
        fullname: author.fullname,
        bio: author.bio,
        twitter: author.twitter,
        department: author.department,
        createdAt: author.createdAt,
        followerCount: author._count.followers,
      },
      articles: author.articles,
      total: author.articles.length,
    };
  }
}

export default GetPublicAuthorProfileService;
