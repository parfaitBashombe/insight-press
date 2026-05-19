import apiFetch from "@/lib/api/index";
import type {
  ApiResponse,
  Article,
  PaginatedArticles,
  WriterStats,
  CreateArticlePayload,
  UpdateArticlePayload,
} from "@/types/writer";

export const getWriterStats = () =>
  apiFetch<ApiResponse<WriterStats>>("/writer/articles/stats/overview");

export const getMyArticles = (page = 1, pageSize = 20) =>
  apiFetch<ApiResponse<PaginatedArticles>>(
    `/writer/articles?page=${page}&pageSize=${pageSize}`,
  );

export const getArticle = (articleId: string) =>
  apiFetch<ApiResponse<Article>>(`/writer/articles/${articleId}`);

export const createArticle = (payload: CreateArticlePayload) =>
  apiFetch<ApiResponse<Article>>("/writer/articles", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateArticle = (articleId: string, payload: UpdateArticlePayload) =>
  apiFetch<ApiResponse<Article>>(`/writer/articles/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const deleteArticle = (articleId: string) =>
  apiFetch<ApiResponse<null>>(`/writer/articles/${articleId}`, { method: "DELETE" });

export const publishArticle = (articleId: string) =>
  apiFetch<ApiResponse<Article>>(`/writer/articles/${articleId}/publish`, {
    method: "PATCH",
  });

export const unpublishArticle = (articleId: string) =>
  apiFetch<ApiResponse<Article>>(`/writer/articles/${articleId}/unpublish`, {
    method: "PATCH",
  });
