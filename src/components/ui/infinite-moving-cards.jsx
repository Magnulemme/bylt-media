"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

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
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}>
        {items.map((item, idx) => (
          <li
            className="relative w-fit max-w-full shrink-0 rounded-2xl border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 shadow-[0_4px_20px_rgba(6,182,212,0.1)]"
            key={`${item.name}-${idx}`}
            style={{
              transform: 'scale(var(--card-scale, 1))',
              transformOrigin: 'center center',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: 'transparent'
            }}
          >
            {item.logo && item.metric && item.quote ? (
              // Success story card format with logo, metric, industry, and quote
              <div className="px-6 py-6 w-72 max-w-full">
                {/* Logo */}
                <div className="w-full h-20 md:h-24 flex items-center justify-center mb-4 p-2">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain opacity-90"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/120x80/1e293b/FFFFFF?text=Logo';
                    }}
                  />
                </div>

                {/* Quote */}
                <p className="text-sm leading-relaxed text-gray-300 italic">
                  "{item.quote}"
                </p>
              </div>
            ) : item.logo ? (
              // Logo card format
              <div className="relative w-40 h-28 md:w-48 md:h-32 flex items-center justify-center p-6">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-w-full max-h-full w-auto h-auto object-contain grayscale-[20%] brightness-110 hover:grayscale-0 hover:brightness-125 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ) : item.quote ? (
              // Testimonial card format with quote
              <blockquote className="px-8 py-8 w-80 max-w-full">
                <span className="relative z-20 text-sm leading-relaxed font-normal text-gray-100 block">
                  {item.quote}
                </span>
                {item.author && (
                  <div className="relative z-20 mt-6 flex items-center">
                    <span className="text-sm font-medium text-gray-300">{item.author}</span>
                  </div>
                )}
              </blockquote>
            ) : (
              // Simple client name format
              <div className="flex items-center justify-center h-full px-8 py-8">
                <span className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {item.name}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
