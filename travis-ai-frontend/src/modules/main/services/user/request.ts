import type { UpdateUserPayload } from "@/modules/auth/types/types";
import type { AuthUser } from "@/modules/auth/types/types";
import type { SuccessResponse } from "@/types/response";
import { useAuthStore } from "@/store/auth/authStore";
import type {
  ChangePasswordPayload,
  DeleteAccountPayload,
} from "../../types/types";

const baseUrl = import.meta.env.VITE_BASEURL!;

const updateUser = async (
  payload: UpdateUserPayload
): Promise<SuccessResponse<AuthUser>> => {
  const res = await fetch(`${baseUrl}/user/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
};

const changePassword = async (payload: ChangePasswordPayload) => {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error("No auth token");
  }
  console.log(token);

  const res = await fetch(`${baseUrl}/user/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log(data);
  return data;
};

const deleteAccount = async (payload: DeleteAccountPayload) => {
  const token = useAuthStore.getState().token;
  const res = await fetch(`${baseUrl}/user/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};
export { changePassword, updateUser, deleteAccount };
