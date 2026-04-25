import BaseService from "@/database/system/base-service.js";
import { type article } from "@/generated/prisma/client.js";
import { CreateArticle } from "@/types/article.js";

type CreateArticleInput = CreateArticle & { authorId: string };

class CreateArticleService extends BaseService<CreateArticleInput, article> {
  protected async transaction(
    data: CreateArticleInput,
  ): Promise<article | null> {
    // Generate a URL-safe slug: lowercase title + short uuid suffix
    const base = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const suffix = crypto.randomUUID().slice(0, 8);
    const slug = `${base}-${suffix}`;

    const result = await this.database.article.create({
      data: {
        author_id: data.authorId,
        title: data.title,
        slug,
        content: data.content,
        cover_image: data.cover_image,
      },
    });

    return result ?? null;
  }
}

export default CreateArticleService;
