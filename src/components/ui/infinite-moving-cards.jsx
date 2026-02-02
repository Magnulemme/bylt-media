"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback, useRef } from "react";

// Unica fonte di verità per la velocità di scroll (px/s)
const SCROLL_SPEED_PX_PER_S = 50;

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast", // mantenuta per retrocompatibilità, ignorata internamente
  pauseOnHover = true,
  className,
  renderItem, // (item, index) => JSX - custom render function
  gap = "gap-6", // Tailwind gap class
  useNestedMask = false, // true = struttura con wrapper esterno per mask (usata in StatsGrid)
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [ready, setReady] = useState(false);

  const updateAnimation = useCallback(() => {
    if (!scrollerRef.current || !containerRef.current) return;

    const children = scrollerRef.current.children;
    if (children.length < items.length * 2) return;

    // Misura la distanza esatta tra il primo item e il primo clone
    const firstItem = children[0];
    const firstClone = children[items.length];
    const distance =
      firstClone.getBoundingClientRect().left -
      firstItem.getBoundingClientRect().left;

    const duration = distance / SCROLL_SPEED_PX_PER_S;

    containerRef.current.style.setProperty("--scroll-distance", `${distance}px`);
    containerRef.current.style.setProperty("--animation-duration", `${duration}s`);
  }, [items.length]);

  useEffect(() => {
    updateAnimation();
    setReady(true);
  }, [updateAnimation]);

  // Ricalcola duration su resize (con debounce)
  useEffect(() => {
    if (!ready) return;

    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateAnimation, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [ready, updateAnimation]);

  // Update direction when prop changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  }, [direction]);

  const listContent = (
    <ul
      ref={scrollerRef}
      className={cn(
        "flex w-max min-w-full shrink-0 flex-nowrap items-stretch",
        gap,
        ready && "animate-scroll",
        pauseOnHover && "hover:[animation-play-state:paused]"
      )}>
      {/* Set originale */}
      {items.map((item, idx) => (
        <li
          key={`a-${item.id || idx}`}
          className="shrink-0 flex"
        >
          {renderItem(item, idx)}
        </li>
      ))}
      {/* Set duplicato per loop seamless — React gestisce gli hook */}
      {items.map((item, idx) => (
        <li
          key={`b-${item.id || idx}`}
          className="shrink-0 flex"
        >
          {renderItem(item, idx)}
        </li>
      ))}
    </ul>
  );

  // Struttura con wrapper esterno per mask (usata in StatsGrid)
  if (useNestedMask) {
    return (
      <div
        className={cn(
          "relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className
        )}>
        <div
          ref={containerRef}
          className="scroller max-w-[var(--breakpoint-content)] mx-auto overflow-hidden"
        >
          {listContent}
        </div>
      </div>
    );
  }

  // Struttura originale (mask sullo stesso div del containerRef)
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-[var(--breakpoint-content)] mx-auto overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}>
      {listContent}
    </div>
  );
};
