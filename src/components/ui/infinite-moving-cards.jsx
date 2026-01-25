"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";


export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  renderItem, // (item, index) => JSX - custom render function
  gap = "gap-6", // Tailwind gap class
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);
  const hasClonedRef = React.useRef(false); // Guard per prevenire clonazione multipla

  useEffect(() => {
    addAnimation();
    // Cleanup: reset del flag quando il componente viene smontato
    return () => {
      hasClonedRef.current = false;
    };
  }, []);

  // Update speed when prop changes
  useEffect(() => {
    getSpeed();
  }, [speed]);

  // Update direction when prop changes
  useEffect(() => {
    getDirection();
  }, [direction]);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current && !hasClonedRef.current) {
      hasClonedRef.current = true; // Previene clonazioni multiple
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate content once for seamless loop (50% + 50% = 100%)
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      let duration;
      if (speed === "fast") {
        duration = "35s";
      } else if (speed === "normal") {
        duration = "45s";
      } else if (speed === "slow") {
        duration = "60s";
      } else {
        // Allow custom speed values (e.g., "10s", "25s")
        duration = speed;
      }
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-[var(--breakpoint-content)] mx-auto overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap py-8",
          gap,
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}>
        {items.map((item, idx) => (
          <li
            key={item.id || `${item.name}-${idx}`}
            className="shrink-0"
          >
            {renderItem(item, idx)}
          </li>
        ))}
      </ul>
    </div>
  );
};
