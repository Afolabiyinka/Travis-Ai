import React from "react";
import { MessageCircleMore } from "lucide-react";
import CustomBtn from "@/components/custom/CustomBtn";
import { AnimatedGradientText } from "@/components/modern-ui/animated-gradient-text";
import IconButton from "@/components/custom/iconbutton";
import { titles } from "@/lib/Random";
import Sidebarprofile from "@/modules/main/nav/sidebarprofile";
import { AnimatePresence, motion } from "motion/react";

const SideBar = () => {
  const [asideOpen, setAsideOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [searchResults, setSearchResults] =
    React.useState<typeof titles>(titles);
  const sidebarRef = React.useRef(null);

  React.useEffect(() => {
    if (asideOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [asideOpen]);

  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(titles);
      return;
    }

    const results = titles.filter((s) =>
      s.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  }, [searchQuery]);

  return (
    <>
      {/* Mobile toggle button */}
      <span
        className={`block lg:hidden fixed top-7 left-6 z-40 ${
          asideOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <IconButton onClick={() => setAsideOpen(true)} icon="Sidebar" />
      </span>

      {/* Mobile Overlay */}
      {asideOpen && (
        <div
          onClick={() => setAsideOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`
          fixed lg:static top-0 left-0 z-50 lg:z-auto rounded-3xl
          h-full lg:h-full w-80 lg:w-96
          lg:rounded-2xl lg:m-1
          flex flex-col
          shadow-2xl lg:shadow-none
          transition-transform duration-300 ease-out
          bg-inherit
          ${asideOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="sticky top-0 z-10 p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <AnimatedGradientText className="text-5xl tracking-wide">
              Travis Ai
            </AnimatedGradientText>
          </div>

          <div className="flex flex-col w-full gap-3 items-center py-4">
            <span className="w-full flex gap-3 items-center justify-center">
              <CustomBtn text="New Chat" endIcon="Pen" isSolid={true} />
              <IconButton
                icon="Search"
                tooltip="Search through your chats"
                onClick={() => setSearchOpen(!searchOpen)}
              />
            </span>

            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border w-full p-3 px-4 rounded-3xl"
                  value={searchQuery}
                  placeholder="Search chats..."
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-3 space-y-1">
          {searchResults.map((title, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="w-full text-left hover:bg-gray-300  hover:text-black p-3 rounded-lg cursor-pointer text-sm flex gap-2 items-center"
              onClick={() =>
                asideOpen && window.innerWidth < 1024 && setAsideOpen(false)
              }
            >
              <MessageCircleMore />
              <div className="truncate">{title}</div>
            </motion.button>
          ))}
        </div>

        <Sidebarprofile />
      </aside>
    </>
  );
};

export default SideBar;
