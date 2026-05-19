import apiFetch from "@/lib/api/index";
import type {
  ApiResponse,
  AdminStats,
  AdminUser,
  PaginatedUsers,
  Role,
  PromotionRequest,
  GetUsersParams,
} from "@/types/admin";

export const getAdminStats = () =>
  apiFetch<ApiResponse<AdminStats>>("/admin/stats");

export const getUsers = (params: GetUsersParams = {}) => {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.search) query.set("search", params.search);
  if (params.roleId) query.set("roleId", params.roleId);
  if (params.status !== undefined) query.set("status", String(params.status));
  return apiFetch<ApiResponse<PaginatedUsers>>(`/admin/users?${query}`);
};

export const getRoles = () =>
  apiFetch<ApiResponse<Role[]>>("/admin/roles");

export const updateUserRole = (userId: string, roleId: string) =>
  apiFetch<ApiResponse<AdminUser>>(`/admin/users/${userId}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role_id: roleId }),
  });

export const updateUserStatus = (userId: string, status: boolean) =>
  apiFetch<ApiResponse<AdminUser>>(`/admin/users/${userId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const getPromotionRequests = () =>
  apiFetch<ApiResponse<PromotionRequest[]>>("/admin/promotion-requests");

export const approvePromotion = (promotionRequestId: string) =>
  apiFetch<ApiResponse<PromotionRequest>>(`/promotion/approve/${promotionRequestId}`, {
    method: "POST",
  });

export const rejectPromotion = (promotionRequestId: string) =>
  apiFetch<ApiResponse<PromotionRequest>>(`/promotion/reject/${promotionRequestId}`, {
    method: "POST",
  });
