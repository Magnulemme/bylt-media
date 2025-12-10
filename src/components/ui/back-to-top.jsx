"use client";
import React, { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastScrollY.current;
    const isScrollingUp = current < previous;

    // Mostra solo quando scrolli verso l'alto dopo 300px
    const shouldShow = current > 300 && isScrollingUp;
    setShow(shouldShow);

    lastScrollY.current = current;
  });

  const scrollToTop = () => {
    if (!show) return; // Ignora click se nascosto
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="md:hidden fixed bottom-20 right-4 z-[9999] px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group font-medium text-sm cursor-pointer touch-manipulation min-w-[120px]"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: show ? 1 : 0,
        scale: show ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      whileTap={show ? { scale: 0.95 } : {}}
      style={{
        pointerEvents: "auto",
        visibility: show ? "visible" : "hidden",
        WebkitTapHighlightColor: "transparent"
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} className="transition-transform" />
      <span>Top</span>
    </motion.button>
  );
};
