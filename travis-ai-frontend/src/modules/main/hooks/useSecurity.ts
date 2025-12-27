import { useMutation } from "@tanstack/react-query";
import type { ChangePasswordPayload } from "../types/types";
import { changePassword } from "../services/user/request";
import { useState } from "react";
import useToastMessage from "@/lib/useToastMsg";
import { useAuthStore } from "@/store/auth/authStore";

export const useSecurity = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { toastError, toastSuccess, toastLoading } = useToastMessage();
  const { user } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onMutate: () => toastLoading("Updating password"),
    onSuccess: (data) => {
      toastSuccess(data.message);
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (err: any) => {
      toastError(err?.message || "Failed to change password");
    },
  });

  const handleChangePassword = () => {
    if (!user?._id) {
      toastError("User not authenticated");
      return;
    }

    if (!passwordData.oldPassword) {
      toastError("Old password is required");
      return;
    }
    if (!passwordData.newPassword) {
      toastError("New password is required");
      return;
    }
    if (!passwordData.confirmPassword) {
      toastError("Pls confirm new password");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toastError("Passwords do not match");
      return;
    }

    mutate({
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword,
      id: user._id,
    });
  };

  return {
    passwordData,
    setPasswordData,
    handleChangePassword,
    isPending,
  };
};
