"use client";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string; // allow custom Tailwind classes
};

export default function InputField({
  label,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className="flex flex-col w-full">
      <input
        {...props}
        className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      />
    </div>
  );
}
