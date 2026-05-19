export type Signup = {
  email: string;
  fullname: string;
  password: string;
};

export type UserUpdate = {
  fullname?: string;
  bio?: string;
  twitter?: string;
  department?: string;
  avatar?: string;
};

export type JwtPayload = {
  payload: {
    user_id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  iat: number;
  exp: number;
};

export type LogIn = {
  email: string;
  fullname?: string;
  password: string;
};

export type GetAllUsersFilters = {
  page: number;
  pageSize: number;
  search?: string;
  status?: boolean;
  roleId?: string;
};

export type PaginatedUsers = {
  data: Omit<
    import("@/generated/prisma/client.js").user,
    "password" | "salt"
  >[];
  total: number;
  page: number;
  totalPages: number;
};

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
};
