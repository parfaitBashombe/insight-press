export type CreateArticle = {
  title: string;
  content: string;
  cover_image?: string;
};

export type UpdateArticle = {
  title?: string;
  content?: string;
  cover_image?: string;
};

export type ArticlePage = {
  page: number;
  pageSize: number;
  authorId: string;
};

export type GetPublicArticlesFilters = {
  page: number;
  pageSize: number;
  search?: string;
  authorId?: string;
};

export type PaginatedArticles = {
  data: import("@/generated/prisma/client.js").article[];
  total: number;
  page: number;
  totalPages: number;
};
