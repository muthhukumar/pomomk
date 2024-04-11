import * as React from "react";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends React.ComponentProps<"button"> {
  icon: IconType;
  size?: number;
}

export default function IconButton({
  className,
  icon,
  size,
  ...props
}: IconButtonProps) {
  const Icon = icon;

  return (
    <button
      className={twMerge(
        "border p-3 rounded-full border-smoke bg-matt-black text-white",
        className
      )}
      {...props}
    >
      <Icon size={size} />
    </button>
  );
}
