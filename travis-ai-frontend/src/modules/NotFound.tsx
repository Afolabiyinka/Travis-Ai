import { motion } from "framer-motion";
import { Flag } from "lucide-react";
import CustomBtn from "@/components/custom/CustomBtn";

function NotFound() {
  return (
    <div className="h-screen  w-full flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md flex flex-col items-center justify-center"
      >
        <Flag className="w-20 h-20 mx-auto text-m-accent" />
        <h1 className="mt-6 text-3xl md:text-4xl font-bold leading-tight">
          Oops! Page not found.
        </h1>
        <h1 className="mt-4 mb-8">
          Looks like you hit a broken route. Let’s get you back on track.
        </h1>

        <CustomBtn text="Go Home" endIcon="ArrowRight" isSolid linkpath={"/"} />
      </motion.div>
    </div>
  );
}

export default NotFound;
