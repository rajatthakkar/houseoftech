"use client";
import React, { ButtonHTMLAttributes } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string; // allow custom Tailwind classes
}

export default function CustomButton({
  label,
  className,
  ...props
}: CustomButtonProps) {
  return (
    <button
      {...props}
      className={`
        w-full
        bg-blue-500
        text-white
        font-semibold
        py-2
        px-4
        rounded-lg
        hover:bg-blue-600
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
        focus:ring-opacity-50
        ${className || ""}
      `}
    >
      {label}
    </button>
  );
}
