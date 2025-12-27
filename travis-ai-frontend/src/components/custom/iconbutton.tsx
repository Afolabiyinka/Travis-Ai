import React from "react";
import { motion } from "motion/react";
import * as LucideIcon from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/modern-ui/tooltip";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: keyof typeof LucideIcon;
  tooltip?: string;
  onClick?: () => void;
  isSolid?: boolean;
}

const IconButton = ({ icon, tooltip, onClick, isSolid }: IconButtonProps) => {
  const IconComponent = LucideIcon[icon] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`${
              isSolid
                ? "bg-m-accent text-white shadow"
                : "shadow backdrop-blur-3xl hover:bg-m-accent hover:text-white"
            } h-10 w-10 stroke-2  rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer p-2`}
            aria-label={tooltip}
          >
            <IconComponent className="h-10 w-10" />
          </motion.button>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default IconButton;
