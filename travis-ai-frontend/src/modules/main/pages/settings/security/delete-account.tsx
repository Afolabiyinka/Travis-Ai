import { Button } from "@/components/modern-ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/modern-ui/dialog";
import { useState } from "react";
import { Input } from "@/components/modern-ui/input";
import useToastMessage from "@/lib/useToastMsg";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth/authStore";
import { deleteAccount } from "@/modules/main/services/user/request";
import type { DeleteAccountPayload } from "@/modules/main/types/types";

const DeleteAccount = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmPhrase, setConfirmed] = useState("");

  const { toastError, toastSuccess } = useToastMessage();
  const { user, logout } = useAuthStore();

  const deletePhrase = import.meta.env.VITE_DELETE_PHRASE;

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: DeleteAccountPayload) => deleteAccount(payload),
    onSuccess: () => {
      toastSuccess("Account deleted successfully");
      logout();
      window.location.href = "/auth/login";
    },
    onError: () => toastError("Failed to delete account, pls try again later"),
  });

  const handleDelete = () => {
    if (confirmPhrase.trim() !== deletePhrase) {
      toastError("Confirmation phrase does not match");
      return;
    }

    if (!user?._id) {
      toastError("User not found");
      return;
    }

    mutate({ id: user._id });
  };

  return (
    <div>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogTrigger>
          <Button variant="destructive">Delete account</Button>
        </DialogTrigger>
        <DialogContent>
          <h3 className="text-xl mb-2">Delete Account</h3>
          <p className="text-sm mb-4">
            This action is permanent. Your account and all data will be deleted.
          </p>

          <p className="mb-1 text-left">
            Type{" "}
            <span className="rounded-sm px-1 py-0.5 border">
              {deletePhrase}
            </span>{" "}
            in the box below
          </p>

          <Input
            className="mb-3"
            value={confirmPhrase}
            onChange={(e) => setConfirmed(e.target.value)}
            placeholder="Type the phrase to confirm"
          />

          <div className="flex gap-3 justify-end">
            <Button onClick={() => setOpenDelete(false)} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={confirmPhrase.trim() !== deletePhrase || isPending}
            >
              {isPending ? "Deleting..." : "Delete my account"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteAccount;
