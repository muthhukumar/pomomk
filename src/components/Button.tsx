import * as React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ComponentProps<"button"> {}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "px-6 py-2 rounded-md bg-matt-black border border-smoke text-white",
        className
      )}
      {...props}
    />
  );
}
