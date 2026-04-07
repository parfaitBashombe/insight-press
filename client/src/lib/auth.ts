import apiFetch from "./api";

export type User = {
  user_id: string;
  fullname: string;
  email: string;
  role_id: string;
  role?: {
    name: string;
  };
  bio?: string | null;
  twitter?: string | null;
  department?: string | null;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  data: T;
  message: string;
};

export type SignupPayload = {
  fullname: string;
  email: string;
  password: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};

export type UpdateProfilePayload = {
  fullname?: string;
  bio?: string;
  twitter?: string;
  department?: string;
};

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
