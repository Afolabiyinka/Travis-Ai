import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/modern-ui/dialog";
import { UnderlineTabs } from "@/components/modern-ui/underline-tabs";
import Profile from "./profile";
import Themetoggle from "./themetoggle";
import { useThemeStore } from "@/store/theme/themeStore";
import Icon from "@/components/custom/Icon";
import SecuritySettings from "./security/security";

const Settings = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const { theme } = useThemeStore();

  const tabs = [
    {
      id: "theme",
      label: "Theme",
      icon: <Icon icon={theme === "light" ? "Sun" : "Moon"} />,
      content: (
        <div className="p-5">
          <Themetoggle />
        </div>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      icon: <Icon icon="User" />,
      content: (
        <div className="p-5">
          <Profile />
        </div>
      ),
    },
    {
      id: "dashboard",
      label: "Customize",
      icon: <Icon icon="Brush" />,
      content: (
        <div className="p-5 text-sm text-muted-foreground">
          Try customizing the AI to your taste
        </div>
      ),
    },
    {
      id: "auth",
      label: "Security",
      icon: <Icon icon="Lock" />,
      content: (
        <div className="p-5">
          <SecuritySettings />
        </div>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-full rounded-2xl p-5 space-y-5 flex justify-center items-center flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Settings
          </DialogTitle>
        </DialogHeader>
        <UnderlineTabs tabs={tabs} className="w-full" />
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
