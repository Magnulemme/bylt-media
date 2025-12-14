"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const sizeVariants = {
  sm: "px-6 py-4 md:px-8 md:py-5 text-xs md:text-sm",
  md: "px-10 py-6 md:px-12 md:py-8 text-sm md:text-base",
  lg: "px-12 py-7 md:px-14 md:py-9 text-base md:text-lg",
};

export function AnimatedButton({
  children,
  href,
  onClick,
  className,
  buttonRef,
  style,
  size = "md",
  as = "a",
  type = "button",
  borderColor = "#06b6d4", // cyan-500 default
  borderRadius = "9999px", // full rounded by default
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [hasHoverCapability, setHasHoverCapability] = React.useState(true);

  // Detect if device has hover capability
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setHasHoverCapability(mediaQuery.matches);

    const handleChange = (e) => {
      setHasHoverCapability(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Pre-warm il blur layer
  React.useEffect(() => {
    // Force reflow per attivare il blur
    requestAnimationFrame(() => {
      setIsReady(true);
    });
  }, []);

  const Component = motion[as];

  const props = {
    ...(as === "a" && href ? { href } : {}),
    ...(as === "button" ? { onClick, type } : {}),
  };

  return (
    <Component
      ref={buttonRef}
      className={cn(
        "group relative inline-flex p-[3px] w-fit",
        className
      )}
      style={{
        ...style,
        borderRadius,
        overflow: "hidden", // Force overflow hidden to contain gradient
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => hasHoverCapability && setIsHovered(true)}
      onMouseLeave={() => hasHoverCapability && setIsHovered(false)}
      {...props}
    >
      {/* Gradient border with CSS mask to show only ring */}
      <div
        className="absolute inset-0 pointer-events-none p-[3px] overflow-hidden"
        style={{
          borderRadius,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      >
        <div
          className="absolute inset-[-200%] animate-[spin_2s_linear_infinite]"
          style={{
            background: `conic-gradient(from 90deg at 50% 50%, ${borderColor} 0%, transparent 50%, ${borderColor} 100%)`,
          }}
        />
      </div>

      {/* Button content - background + blur overlay */}
      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center uppercase tracking-[0.3em] font-semibold transition-all duration-300 cursor-pointer",
          sizeVariants[size]
        )}
        style={{
          borderRadius: `calc(${borderRadius} - 3px)`,
          willChange: "backdrop-filter",
          transform: "translateZ(0)",
          WebkitBackdropFilter: "blur(8px)",
          backdropFilter: "blur(8px)",
          isolation: "isolate",
          // Forza il layer anche quando opacity 0
          backfaceVisibility: "hidden",
          perspective: 1000,
          contain: "layout style paint",
          // Inizia trasparente se non ready
          opacity: isReady ? 1 : 0,
          transition: isReady ? "opacity 0.15s ease-out" : "none",
        }}
      >
        {/* Text and content container with slide animation */}
        <span className="relative inline-flex items-center gap-2">
          {/* White content - slides up on hover */}
          <motion.span
            className="flex items-center gap-2 text-white whitespace-nowrap leading-relaxed"
            animate={{
              y: isHovered ? "-150%" : "0%",
              opacity: isHovered ? 0 : 1,
            }}
            transition={{
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {children}
          </motion.span>

          {/* Colored content - slides in from bottom on hover */}
          <motion.span
            className="absolute top-0 flex items-center gap-2 whitespace-nowrap leading-relaxed"
            style={{ color: borderColor }}
            animate={{
              y: isHovered ? "0%" : "150%",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {children}
          </motion.span>
        </span>
      </div>
    </Component>
  );
}
