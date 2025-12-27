import React from "react";
import { AnimatePresence, motion } from "motion/react";
import IconButton from "../../../components/custom/iconbutton";
import CustomBtn from "../../../components/custom/CustomBtn";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/modern-ui/avatar";
import Settings from "@/modules/main/pages/settings/settings";
import { useAuthStore } from "@/store/auth/authStore";

const Sidebarprofile = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [settingsModal, setModal] = React.useState<boolean>(false);
  const { user, logout } = useAuthStore();
  return (
    <div
      className={`w-full shadow flex gap-1 transition-all duration-500 flex-col justify-between items-center rounded-4xl`}
    >
      <div className="w-full flex gap-3 transition-all duration-500 flex-col justify-between items-center p-2 rounded-3xl">
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col items-center gap-3 rounded-full p-3"
            >
              {/* HELP */}
              <div className="flex items-center justify-start w-full gap-2 cursor-pointer">
                <IconButton icon="HelpCircle" />
                <p>Help</p>
              </div>

              {/* SETTINGS */}
              <div
                className="flex gap-2 justify-start items-center w-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setModal(true);
                }}
              >
                <IconButton icon="Settings" />
                <p className="font-inter text-lg font-medium">Settings</p>
              </div>

              <CustomBtn
                text="Log Out"
                isSolid
                endIcon="LogOut"
                onClick={() => logout()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER PROFILE */}
        <div className="flex items-center justify-between gap-1 w-full rounded-full p-2">
          <div className="text-left flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src="https://i.pinimg.com/736x/30/e4/1a/30e41a3c63afb9c97a723ea2022d0311.jpg"
                alt="Robinn"
              />
              <AvatarFallback>{user?.username.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <p className="font-inter text-lg font-medium">{user?.username}</p>
          </div>

          <IconButton
            icon={open ? "ChevronDown" : "ChevronUp"}
            onClick={() => setOpen(!open)}
          />
        </div>

        <Settings open={settingsModal} setOpen={setModal} />
      </div>
    </div>
  );
};

export default Sidebarprofile;
