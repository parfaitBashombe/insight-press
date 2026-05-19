import type { ApiResponse as _ApiResponse } from "./auth";

export type { ApiResponse } from "./auth";

export type AdminStats = {
  users: { total: number; active: number; suspended: number };
  articles: { total: number; published: number; drafts: number };
  promotionRequests: { pending: number };
};

export type Role = {
  role_id: string;
  name: string;
  description: string | null;
};

export type AdminUser = {
  user_id: string;
  fullname: string;
  email: string;
  status: boolean;
  createdAt: string;
  role: Role;
};

export type PaginatedUsers = {
  data: AdminUser[];
  total: number;
  page: number;
  totalPages: number;
};

export type PromotionRequest = {
  promotion_request_id: string;
  user_id: string;
  role_id: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewed_at: string | null;
  createdAt: string;
  user: {
    user_id: string;
    fullname: string;
    email: string;
    status: boolean;
    role: Role;
  };
  role: Role;
};

export type GetUsersParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  roleId?: string;
  status?: boolean;
};
