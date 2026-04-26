import BaseService from "@/database/system/base-service.js";
import { type user, type article } from "@/generated/prisma/client.js";

type PublicAuthorProfile = Partial<user> & { articles: article[] };

class GetPublicAuthorProfileService extends BaseService<
  string,
  PublicAuthorProfile | null
> {
  protected async transaction(
    authorId: string,
  ): Promise<PublicAuthorProfile | null> {
    const author = await this.database.user.findUnique({
      where: { user_id: authorId },
      select: {
        user_id: true,
        fullname: true,
        bio: true,
        twitter: true,
        department: true,
        articles: {
          where: { status: "PUBLISHED" },
          orderBy: { published_at: "desc" },
        },
      },
    });

    if (!author) {
      return null;
    }

    return author as unknown as PublicAuthorProfile;
  }
}

export default GetPublicAuthorProfileService;
