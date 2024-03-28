import * as React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ComponentProps<"button"> {}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "border px-5 py-2 rounded-md bg-black text-white",
        className
      )}
      {...props}
    />
  );
}
