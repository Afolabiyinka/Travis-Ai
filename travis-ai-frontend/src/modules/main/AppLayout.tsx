import { Outlet } from "react-router-dom";
import SideBar from "./nav/SideBar";
import { motion } from "motion/react";
import TextArea from "@/components/custom/TextArea";

const AppLayout = () => {
  return (
    <div className="flex h-screen  gap-3 p-4">
      {/* Left Sidebar */}
      <SideBar />

      {/* Right Side */}
      <div className="flex flex-col w-full justify-center items-center h-full">
        {/* Main Content / Scrollable */}
        <div className="flex-1 overflow-y-auto px-2 pb-24">
          <Outlet />
        </div>

        {/* Fixed TextArea */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.5, delay: 0.4 }}
          className="w-full max-w-[650px] mx-auto fixed bottom-4 px-2"
        >
          <TextArea text="Generate Excuse" />
        </motion.div>
      </div>
    </div>
  );
};

export default AppLayout;
