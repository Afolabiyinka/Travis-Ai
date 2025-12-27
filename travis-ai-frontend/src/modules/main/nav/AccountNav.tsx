import IconButton from "@/components/custom/iconbutton";
import React from "react";
import Icon from "@/components/custom/Icon";
import { AnimatePresence, motion } from "motion/react";
import { useThemeStore, type Theme } from "@/store/theme/themeStore";

const AccountNav = () => {
  const { theme, setTheme } = useThemeStore();
  const [menu, setOpenMenu] = React.useState(false);

  const handleClick = (newTheme: Theme) => {
    setTheme(newTheme);
    setOpenMenu(false);
  };

  return (
    <div className="rounded-full gap-3 p-3 w-full h-full flex justify-end relative">
      <IconButton
        icon={theme === "dark" ? "Moon" : "Sun"}
        tooltip="Change theme"
        onClick={() => setOpenMenu(true)}
      />
      <AnimatePresence mode="wait">
        {menu && (
          <motion.span
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            className="flex flex-col gap-3 justify-center items-center
      fixed top-20 right-5 z-50 p-2 rounded-lg bg-white dark:bg-neutral-900
      shadow-xl"
          >
            <span
              className="flex justify-between cursor-pointer backdrop-blur-lg p-2 gap-11 w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition"
              onClick={() => handleClick("light")}
            >
              Light <Icon icon="Sun" />
            </span>

            <span
              className="flex justify-between cursor-pointer p-2 gap-2 w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition"
              onClick={() => handleClick("dark")}
            >
              Dark <Icon icon="Moon" />
            </span>
            <span
              className="flex justify-between cursor-pointer p-2 gap-2 w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition"
              onClick={() => handleClick("system")}
            >
              System <Icon icon="Laptop" />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountNav;
