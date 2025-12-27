import React from "react";
import { TypewriterEffect } from "@/components/modern-ui/typewriter-effect";
import { motion } from "framer-motion";
import CustomBtn from "@/components/custom/CustomBtn";
import { AnimatedGradientText } from "@/components/modern-ui/animated-gradient-text";
import darkscreenshot from "@/assets/screenshots/Dark screenshot.png";
import lightScreenShot from "@/assets/screenshots/Light screenshot.png";
import { useThemeStore } from "@/store/theme/themeStore";

const Home: React.FC = () => {
  const { theme } = useThemeStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col lg:flex-row items-center min-h-screen justify-center text-center px-4 py-8 lg:py-0"
    >
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center gap-4 sm:gap-6 w-full h-full lg:w-1/2 lg:px-8 xl:px-16">
        <motion.h1 className="text-5xl md:text-5xl lg:text-6xl mb-2 sm:mb-4">
          Meet <AnimatedGradientText>Travis Ai</AnimatedGradientText>
        </motion.h1>

        <TypewriterEffect
          words={[
            {
              text: "Ai",
              className: "text-3xl  md:text-4xl lg:text-4xl font-bold",
            },
            {
              text: "Powered",
              className: "text-3xl smd:text-4xl lg:text-4xl font-bold",
            },
            {
              text: "Excuse",
              className: "text-3xl  md:text-4xl lg:text-4xl font-bold",
            },
            {
              text: "Generator ✨",
              className:
                "text-3xl md:text-4xl lg:text-4xl font-bold text-blue-500",
            },
          ]}
          className="leading-tight"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[Roboto slab]"
        >
          Excuses? Solved. Instantly. Your AI wingman for epic comebacks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mt-2"
        >
          <CustomBtn
            text="Generate Your Excuse ⚡"
            startIcon="Sparkles"
            linkpath={`auth/login`}
            isSolid={true}
          />
        </motion.div>
      </div>

      <motion.div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 mt-8 lg:mt-0"
        initial={{ y: -10 }}
        animate={{ y: 1 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={theme === "light" ? lightScreenShot : darkscreenshot}
          className="w-full max-w-2xl rounded-lg shadow-lg"
          alt="Travis AI Screenshot"
        />
      </motion.div>
    </motion.div>
  );
};

export default Home;
