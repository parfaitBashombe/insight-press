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
