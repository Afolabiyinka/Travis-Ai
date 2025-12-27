import React from "react";
import * as LucideIcon from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../modern-ui/tooltip";

interface IconProps {
  icon: keyof typeof LucideIcon;
  tooltip?: string;
  onClick?: () => void;
}

const Icon = ({ icon, tooltip, onClick }: IconProps) => {
  const IconComponent = LucideIcon[icon] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  return (
    <span onClick={onClick}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconComponent className="cursor-pointer" />
          </TooltipTrigger>
          {tooltip && (
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </span>
  );
};

export default Icon;
