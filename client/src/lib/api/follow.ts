import apiFetch from "@/lib/api/index";
import type { ApiResponse } from "@/types/auth";

export const followWriter = (authorId: string) =>
  apiFetch<ApiResponse<{ following: boolean }>>(`/users/${authorId}/follow`, {
    method: "POST",
  });

export const unfollowWriter = (authorId: string) =>
  apiFetch<ApiResponse<null>>(`/users/${authorId}/follow`, { method: "DELETE" });

export const getFollowStatus = (authorId: string) =>
  apiFetch<ApiResponse<{ following: boolean }>>(`/users/${authorId}/follow-status`);
