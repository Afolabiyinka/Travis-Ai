import { motion } from "framer-motion";
import { excuseSuggestions } from "@/lib/Random";

export const ExcuseGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {excuseSuggestions.map((suggestion, idx) => {
        return (
          <motion.button
            key={idx}
            role="button"
            tabIndex={0}
            aria-label={`Select excuse: ${suggestion}`}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`
              p-4 text-center rounded-full cursor-pointer
              border border-m-accent
              hover:bg-m-accent hover:text-white hover:border-m-accent/50
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m-accent
              transition-all duration-300 shadow-sm
              whitespace-nowrap overflow-hidden text-ellipsis
            `}
          >
            {suggestion}
          </motion.button>
        );
      })}
    </div>
  );
};
