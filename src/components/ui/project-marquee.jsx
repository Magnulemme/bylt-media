"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export const ProjectMarquee = ({
  projects,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  useEffect(() => {
    getSpeed();
  }, [speed]);

  useEffect(() => {
    getDirection();
  }, [direction]);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate content for seamless loop
      for (let i = 0; i < 2; i++) {
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
        duration = "20s";
      } else if (speed === "normal") {
        duration = "35s";
      } else if (speed === "slow") {
        duration = "50s";
      } else {
        duration = speed;
      }
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {projects.map((project, idx) => (
          <li key={`${project.name}-${idx}`} className="shrink-0">
            <Link href={project.href}>
              <img
                src={project.image}
                alt={project.name}
                className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-xl object-cover"
                loading="lazy"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
