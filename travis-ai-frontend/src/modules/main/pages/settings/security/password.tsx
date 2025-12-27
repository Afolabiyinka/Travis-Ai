import CustomBtn from "@/components/custom/CustomBtn";
import { Button } from "@/components/modern-ui/button";
import { Dialog, DialogContent } from "@/components/modern-ui/dialog";
import Input from "@/modules/auth/components/Input";
import { useSecurity } from "@/modules/main/hooks/useSecurity";
import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";

const Password = () => {
  const [openPassword, setOpenPassword] = React.useState(false);

  const { passwordData, setPasswordData, handleChangePassword, isPending } =
    useSecurity();
  return (
    <div>
      <Dialog open={openPassword} onOpenChange={setOpenPassword}>
        <DialogTrigger>
          <Button
            variant={`outline`}
            // className="text-m-accent cursor-pointer"
            onClick={() => setOpenPassword(true)}
          >
            Change password
          </Button>
        </DialogTrigger>
        <DialogContent>
          <h3 className="text-xl mb-3">Change Password</h3>

          <div className="flex flex-col gap-3">
            <Input
              startIcon="Lock"
              type="password"
              placeholder="Old password"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, oldPassword: e })
              }
            />
            <Input
              startIcon="Lock"
              type="password"
              placeholder="New password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e })
              }
            />
            <Input
              startIcon="Lock"
              type="password"
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e,
                })
              }
            />

            <CustomBtn
              text={isPending ? "Updating..." : "Update password"}
              isSolid
              disabled={isPending}
              onClick={handleChangePassword}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Password;
