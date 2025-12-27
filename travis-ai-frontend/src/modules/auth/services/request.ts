import type { LoginPayload, SignupPayload } from "../types/types";
import type { SuccessResponse } from "@/types/response";
import type { AuthUser } from "../types/types";

const baseUrl = import.meta.env.VITE_BASEURL!;

const login = async (
  payload: LoginPayload
): Promise<SuccessResponse<AuthUser>> => {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};
const signup = async (
  payload: SignupPayload
): Promise<SuccessResponse<AuthUser>> => {
  const res = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export { login, signup };
