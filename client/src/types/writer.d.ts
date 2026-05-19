export type { ApiResponse } from "./auth";

export type Article = {
  article_id: string;
  author_id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  published_at: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedArticles = {
  data: Article[];
  total: number;
  page: number;
  totalPages: number;
};

export type WriterStats = {
  articles: { total: number; published: number; drafts: number };
};

export type CreateArticlePayload = {
  title: string;
  content: string;
  cover_image?: string;
};

export type UpdateArticlePayload = {
  title?: string;
  content?: string;
  cover_image?: string;
};
