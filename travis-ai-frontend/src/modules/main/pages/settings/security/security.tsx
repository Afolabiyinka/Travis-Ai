import Password from "./password";
import DeleteAccount from "./delete-account";
import { Info } from "lucide-react";

const SecuritySettings = () => {
  return (
    <div className="max-w-xl mx-auto p-6  rounded-xl flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Security Settings</h1>

      <p className="text-sm flex gap-2">
        <Info size={40} />
        Manage sensitive actions like changing your password or deleting your
        account. Be careful!
      </p>

      <div className="flex flex-col gap-6">
        {/* Change password */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h2 className="text-lg font-medium">Change Password</h2>
          <Password />
        </div>

        {/* Delete account */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h2 className="text-lg font-medium">Delete Account</h2>
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
