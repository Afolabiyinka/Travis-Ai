import useToastMessage from "@/lib/useToastMsg";
import React from "react";
import type { LoginPayload } from "../types/types";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/request";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth/authStore";

export default function useLogin() {
  const [loginData, setLoginData] = React.useState<LoginPayload>({
    email: "",
    password: "",
  });

  const { toastError, toastSuccess } = useToastMessage();
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      toastSuccess(data.message);
      setToken(data.token);
      setUser(data.user);
      navigate("/ai/home");
    },
    onError: (err) => {
      toastError(err.message || "Something went wrong");
    },
  });

  const handlelogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.email) return toastError("Email is required");
    if (!loginData.password) return toastError("Password is required");
    if (loginData.password.length < 6)
      return toastError("Password must be at least 6 characters");
    if (!/[A-Z]/.test(loginData.password))
      return toastError("Password must contain an uppercase letter");
    loginMutation.mutate(loginData);
  };

  return {
    loginData,
    setLoginData,
    handlelogin,
    isLoading: loginMutation.isPending,
  };
}
