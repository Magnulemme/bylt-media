"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback, useRef } from "react";

const SCROLL_SPEED_PX_PER_S = 50;

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  renderItem,
  gap = "gap-6",
  useNestedMask = false,
  oscillate = false,
  oscillateAmplitude = 8,
  oscillateSpeed = 0.02,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [repeatCount, setRepeatCount] = useState(2);
  const [offsets, setOffsets] = useState([]);
  const animationRef = useRef(null);
  const angleRef = useRef(0);

  // Oscillation animation loop
  useEffect(() => {
    if (!oscillate || !ready) return;

    const totalItems = items.length * repeatCount;
    const phaseStep = (Math.PI * 2 * 0.5) / items.length;

    const animate = () => {
      angleRef.current += oscillateSpeed;

      const newOffsets = [];
      for (let i = 0; i < totalItems; i++) {
        const itemPhase = (i % items.length) * phaseStep;
        const y = Math.sin(angleRef.current + itemPhase) * oscillateAmplitude;
        newOffsets.push(y);
      }
      setOffsets(newOffsets);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [oscillate, ready, items.length, repeatCount, oscillateAmplitude, oscillateSpeed]);

  const updateAnimation = useCallback(() => {
    if (!scrollerRef.current || !containerRef.current) return;

    const children = scrollerRef.current.children;
    if (children.length < items.length * 2) return;

    const singleSetWidth =
      children[items.length - 1].getBoundingClientRect().right -
      children[0].getBoundingClientRect().left;

    const containerWidth = containerRef.current.offsetWidth;
    const needed = Math.ceil(containerWidth / singleSetWidth) + 1;

    if (needed > repeatCount) {
      setRepeatCount(needed);
      return;
    }

    const firstItem = children[0];
    const firstClone = children[items.length];
    const distance =
      firstClone.getBoundingClientRect().left -
      firstItem.getBoundingClientRect().left;

    const duration = distance / SCROLL_SPEED_PX_PER_S;

    containerRef.current.style.setProperty("--scroll-distance", `${distance}px`);
    containerRef.current.style.setProperty("--animation-duration", `${duration}s`);
  }, [items.length, repeatCount]);

  useEffect(() => {
    updateAnimation();
    setReady(true);
  }, [updateAnimation]);

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
      {Array.from({ length: repeatCount }).map((_, copyIdx) =>
        items.map((item, idx) => {
          const globalIdx = copyIdx * items.length + idx;
          return (
            <li
              key={`${copyIdx}-${item.id || idx}`}
              className="shrink-0 flex"
              style={oscillate && offsets.length > 0
                ? { transform: `translateY(${offsets[globalIdx]}px)` }
                : undefined}
            >
              {renderItem(item, idx)}
            </li>
          );
        })
      )}
    </ul>
  );

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
