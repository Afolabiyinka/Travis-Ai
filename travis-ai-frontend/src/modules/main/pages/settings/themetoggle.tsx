import Icon from "@/components/custom/Icon";
import { useThemeStore } from "@/store/theme/themeStore";
import { motion } from "motion/react";

const themetoggle = () => {
  const { setTheme } = useThemeStore();
  return (
    <motion.span
      className="flex flex-col gap-3 justify-center items-center
       p-2 rounded-lg bg-white dark:bg-neutral-900
      shadow-xl"
    >
      <span
        className="flex justify-between cursor-pointer backdrop-blur-lg p-2 gap-11 w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition"
        onClick={() => setTheme("light")}
      >
        Light <Icon icon="Sun" />
      </span>

      <span
        className="flex justify-between cursor-pointer p-2 gap-2 w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition"
        onClick={() => setTheme("dark")}
      >
        Dark <Icon icon="Moon" />
      </span>
      <span
        className="flex justify-between cursor-pointer p-2 gap-2 w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition"
        onClick={() => setTheme("system")}
      >
        System <Icon icon="Laptop" />
      </span>
    </motion.span>
  );
};

export default themetoggle;
