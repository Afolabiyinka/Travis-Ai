import { useEffect, useState } from "react";
import { AnimatedGradientText } from "@/components/modern-ui/animated-gradient-text";
import { motion, AnimatePresence } from "framer-motion";
import { ExcuseGrid } from "@/components/custom/ExcuseCard";
import { useAuthStore } from "@/store/auth/authStore";

const AiHome = () => {
  const { user } = useAuthStore();
  const phrases = [
    "Caught slippin’ again?",
    "What’s your excuse this time?",
    "Back at it again, I see.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-3xl flex h-full w-full p-6 flex-col justify-center items-center relative">
      <div className="flex flex-col gap-10 w-full max-w-4xl items-center justify-center">
        {/* Animated Greeting */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={phrases[index]}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-center"
          >
            <AnimatedGradientText className="text-4xl md:text-6xl  mb-3 leading-tight">
              Hi {user?.username}, <br /> {phrases[index]}
            </AnimatedGradientText>
          </motion.h1>
        </AnimatePresence>

        {/* Suggestions */}
        <ExcuseGrid />
      </div>
    </div>
  );
};

export default AiHome;
