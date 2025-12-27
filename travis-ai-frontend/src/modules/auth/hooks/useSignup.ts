import useToastMessage from "@/lib/useToastMsg";
import React from "react";
import type { SignupPayload } from "../types/types";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/request";
import { useAuthStore } from "@/store/auth/authStore";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
  const [signUpData, setSignUpData] = React.useState<SignupPayload>({
    email: "",
    password: "",
    confirmedPassword: "",
    username: "",
  });

  const { toastError, toastSuccess } = useToastMessage();
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),
    onSuccess: (data) => {
      toastSuccess(data.message);
      setUser(data.user);
      setToken(data.token);
      navigate("/ai/home");
    },
    onError: (err) => {
      toastError(err.message || "Something went wrong");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signUpData.email) return toastError("Email is required");
    if (!signUpData.password) return toastError("Password is required");
    if (!signUpData.username) return toastError("Username is required");
    if (signUpData.password.length < 6)
      return toastError("Password must be at least 6 characters");
    if (signUpData.password !== signUpData.confirmedPassword)
      return toastError("Passwords don't match");
    if (!/[A-Z]/.test(signUpData.password))
      return toastError("Password must contain at least one uppercase letter");

    registerMutation.mutate(signUpData);
  };

  return {
    setSignUpData,
    handleSubmit,
    signUpData,
    isLoading: registerMutation.isPending,
  };
}
