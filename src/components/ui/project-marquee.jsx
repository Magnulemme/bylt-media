"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";


export const ProjectMarquee = ({
  projects,
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
        "scroller relative z-20 h-56 md:h-72",
        "[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      style={{ overflow: 'clip' }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "absolute left-0 top-0 flex flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}>
        {projects.map((project, idx) => (
          <li
            className="relative shrink-0 rounded-2xl overflow-hidden group"
            key={`${project.name || project.title}-${idx}`}
          >
            <img
              src={project.image}
              alt={project.name || project.title || 'Project'}
              className="w-auto h-48 md:h-64 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x256/1e293b/FFFFFF?text=Project';
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
