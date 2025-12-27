import * as LucideIcon from "lucide-react";
import { Eye, EyeClosed } from "lucide-react";
import React from "react";

interface InputProps {
  startIcon: keyof typeof LucideIcon;
  type?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
  value: string | undefined;
}

const Input = ({
  startIcon,
  placeholder,
  type,
  onChange,
  value,
  ...props
}: InputProps) => {
  const IconComponent = LucideIcon[startIcon] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <span className="border mt-2 w-full  flex  p-1 px-6 h-16 items-center rounded-4xl border-m-accent">
      <IconComponent />
      <input
        className="h-full w-full border-0 outline-0 p-1 placeholder:text-md"
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        type={type === "password" && showPassword ? "text" : type}
        {...props}
        value={value}
      />
      {type === "password" && (
        <span
          className="pr-2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye /> : <EyeClosed />}
        </span>
      )}
    </span>
  );
};

export default Input;
