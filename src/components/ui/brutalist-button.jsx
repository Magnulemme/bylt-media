"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function BrutalistButton({
  children,
  href,
  onClick,
  className,
  as = "a",
  type = "button",
  ...props
}) {
  const Component = as;

  const componentProps = {
    ...(as === "a" && href ? { href } : {}),
    ...(as === "button" ? { onClick, type } : {}),
    ...props,
  };

  return (
    <Component
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300",
        "bg-white/5 backdrop-blur-sm border-2 border-white/30 hover:border-cyan-400/60 rounded-lg",
        "hover:translate-x-[2px] hover:translate-y-[2px]",
        className
      )}
      style={{
        boxShadow: "8px 8px 0px rgba(34, 211, 238, 1)",
        transition: "all 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "6px 6px 0px rgba(34, 211, 238, 1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "8px 8px 0px rgba(34, 211, 238, 1)";
      }}
      {...componentProps}
    >
      {children}
    </Component>
  );
}
