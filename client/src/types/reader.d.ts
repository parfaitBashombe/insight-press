export type { ApiResponse } from "./auth";

export type PublicArticle = {
  article_id: string;
  author_id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  status: "PUBLISHED";
  published_at: string;
  createdAt: string;
  author: {
    fullname: string;
    bio: string | null;
  };
};

export type PublicPaginated = {
  data: PublicArticle[];
  total: number;
  page: number;
  totalPages: number;
};

export type ProfileArticle = Omit<PublicArticle, "author">;

export type AuthorProfile = {
  author: {
    user_id: string;
    fullname: string;
    bio: string | null;
    twitter: string | null;
    department: string | null;
    createdAt: string;
    followerCount: number;
  };
  articles: ProfileArticle[];
  total: number;
};

export type GetPublicArticlesParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  authorId?: string;
};
