import apiFetch from "@/lib/api/index";
import type { User, ApiResponse, SignupPayload, SigninPayload, UpdateProfilePayload } from "@/types/auth";

export const signup = (payload: SignupPayload) =>
  apiFetch<ApiResponse<User>>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const signin = (payload: SigninPayload) =>
  apiFetch<ApiResponse<User>>("/auth/signin", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getProfile = () =>
  apiFetch<ApiResponse<User>>("/auth/profile");

export const updateProfile = (userId: string, payload: UpdateProfilePayload) =>
  apiFetch<ApiResponse<User>>(`/auth/update/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const logout = () =>
  apiFetch<ApiResponse<null>>("/auth/logout", { method: "POST" });

export const changePassword = (payload: { currentPassword: string; newPassword: string }) =>
  apiFetch<ApiResponse<null>>("/auth/password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const requestPromotion = (payload: { role_id: string; reason: string }) =>
  apiFetch<ApiResponse<null>>("/promotion/request", {
    method: "POST",
    body: JSON.stringify(payload),
  });
