import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useToastMessage from "@/lib/useToastMsg";
import type { UpdateUserPayload } from "@/modules/auth/types/types";
import { useAuthStore } from "@/store/auth/authStore";
import { updateUser } from "../services/user/request";

export default function useUser() {
  const [updatedData, setupdatedData] = useState<UpdateUserPayload>({
    email: "",
    id: "",
    username: "",
  });

  const { toastError, toastSuccess, toastLoading } = useToastMessage();
  const { user, setUser } = useAuthStore();
  useEffect(() => {
    if (!user) return;

    setupdatedData({
      email: user.email,
      username: user.username,
      id: user._id,
    });
  }, [user]);

  const { mutate } = useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateUser(payload),
    onMutate: () => toastLoading("Updating your profile"),
    onSuccess: (data) => {
      toastSuccess(data.message);
      if (data.user) {
        setUser(data.user);
      }
    },
    onError: (error) => {
      toastError(error.message || "Something went wrong");
    },
  });

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    mutate(updatedData);
  }

  return { updatedData, setupdatedData, handleUpdate };
}
