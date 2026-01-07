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

  // Update speed when prop changes
  useEffect(() => {
    getSpeed();
  }, [speed]);

  // Update direction when prop changes
  useEffect(() => {
    getDirection();
  }, [direction]);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate content multiple times for seamless loop
      // Duplicate 3 times to ensure smooth infinite scroll
      for (let i = 0; i < 3; i++) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });
      }

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
        duration = "15s";
      } else if (speed === "normal") {
        duration = "45s";
      } else if (speed === "slow") {
        duration = "60s";
      } else {
        // Allow custom speed values (e.g., "10s", "25s")
        duration = speed;
      }
      console.log("Setting animation speed to:", duration);
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl mx-auto overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-8",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          gap: '24px' // Force gap with inline style
        }}>
        {items.map((item, idx) => (
          <li
            className="relative w-fit max-w-full shrink-0 rounded-2xl border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300"
            key={`${item.name}-${idx}`}
            style={{
              transform: 'scale(var(--card-scale, 1))',
              transformOrigin: 'center center',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: 'transparent',
              boxShadow: '0 4px 20px rgba(6, 182, 212, 0.1), 0 0 40px rgba(6, 182, 212, 0.08)',
              marginRight: '24px'
            }}
          >
            {item.avatar && item.quote ? (
              // Testimonial card with photo, name, and quote - simplified
              <div className="px-6 py-6 w-80 max-w-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 h-full flex flex-col">
                {/* Header with avatar and name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/30"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/48x48/1e293b/FFFFFF?text=' + item.name.charAt(0);
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-white">{item.name}</h4>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-sm leading-relaxed text-gray-300 italic flex-1">
                  "{item.quote}"
                </blockquote>
              </div>
            ) : item.logo && item.metric && item.quote ? (
              // Success story card format with rating, logo, quote, metric, and author
              <div className="px-6 py-6 w-80 max-w-full min-h-[320px] bg-gradient-to-br from-slate-800/50 to-slate-900/50 flex flex-col">
                {/* Rating Stars */}
                {item.rating && (
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4"
                        fill={i < item.rating ? "#fbbf24" : "none"}
                        stroke={i < item.rating ? "#fbbf24" : "#4b5563"}
                        strokeWidth="1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                )}

                {/* Logo */}
                <div className="w-full h-16 flex items-center justify-start mb-4">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="max-h-full w-auto object-contain opacity-90"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/120x80/1e293b/FFFFFF?text=Logo';
                    }}
                  />
                </div>

                {/* Quote */}
                <blockquote className="text-sm leading-relaxed text-gray-300 mb-4 flex-1">
                  "{item.quote}"
                </blockquote>

                {/* Metric - Highlighted */}
                {item.metric && (
                  <div className="text-cyan-400 font-semibold text-base mb-3">
                    {item.metric}
                  </div>
                )}

                {/* Author */}
                {item.author && (
                  <div className="text-xs text-gray-500 font-medium">
                    — {item.author}
                  </div>
                )}
              </div>
            ) : item.logo && item.tag ? (
              // Tech Stack card format - clean: solo logo + nome
              <div className="relative w-[220px] h-[200px] bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl group overflow-visible transition-all duration-300 flex flex-col items-center justify-center gap-4 p-6">
                {/* Logo - protagonista */}
                <div className="w-24 h-24 flex items-center justify-center">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110 opacity-90"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/96x96/4a4e69/FFFFFF?text=' + item.name.charAt(0);
                    }}
                  />
                </div>

                {/* Name - sottotitolo discreto */}
                <p className="text-gray-400 font-normal text-sm text-center group-hover:text-gray-300 transition-colors">
                  {item.name}
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
