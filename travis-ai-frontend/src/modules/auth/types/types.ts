export interface AuthUser {
  email: string;
  _id: string;
  username: string;
  [key: string]: any;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type UpdateUserPayload = {
  username: string;
  email: string;
  id: string;
};
