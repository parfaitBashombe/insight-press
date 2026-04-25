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
