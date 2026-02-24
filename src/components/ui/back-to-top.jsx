"use client";
import React, { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";

export const MobileMenuFab = ({ isOpen, onToggle }) => {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastScrollY.current;
    const isScrollingUp = current < previous;
    // Mostra solo quando scrolli verso l'alto dopo 300px
    setShow(current > 300 && isScrollingUp);
    lastScrollY.current = current;
  });

  // Sempre visibile quando il menu è aperto
  const visible = show || isOpen;

  return (
    <motion.button
      onClick={onToggle}
      className="md:hidden fixed bottom-20 right-4 z-[9999] p-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer touch-manipulation"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      whileTap={visible ? { scale: 0.9 } : {}}
      style={{
        pointerEvents: visible ? "auto" : "none",
        WebkitTapHighlightColor: "transparent"
      }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </motion.div>
    </motion.button>
  );
};
