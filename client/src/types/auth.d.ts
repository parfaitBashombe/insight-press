export type ApiResponse<T> = {
  data: T;
  message: string;
};

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
