import apiFetch from "@/lib/api/index";
import type {
  ApiResponse,
  PublicArticle,
  PublicPaginated,
  AuthorProfile,
  GetPublicArticlesParams,
} from "@/types/reader";

export const getPublicArticles = (params?: GetPublicArticlesParams) => {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.pageSize) query.set("pageSize", String(params.pageSize));
  if (params?.search) query.set("search", params.search);
  if (params?.authorId) query.set("authorId", params.authorId);
  return apiFetch<ApiResponse<PublicPaginated>>(`/articles?${query}`);
};

export const getArticleBySlug = (slug: string) =>
  apiFetch<ApiResponse<PublicArticle>>(`/articles/${slug}`);

export const getAuthorProfile = (authorId: string) =>
  apiFetch<ApiResponse<AuthorProfile>>(`/articles/author/${authorId}`);
