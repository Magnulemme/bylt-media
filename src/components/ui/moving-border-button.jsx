import { useState, useRef, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

// Moving Border Component
const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  dimensions,
  randomOffset = 0,
  ...otherProps
}) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    if (!pathRef.current) return;

    try {
      const length = pathRef.current.getTotalLength();
      if (length && length > 0) {
        const pxPerMillisecond = length / duration;
        const offsetTime = time + randomOffset * duration;
        const progressValue = (offsetTime * pxPerMillisecond) % length;
        progress.set(progressValue);
      }
    } catch (error) {
      // Path not ready yet, skip this frame
    }
  });

  const x = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    try {
      const point = pathRef.current.getPointAtLength(val);
      return point ? point.x : 0;
    } catch {
      return 0;
    }
  });

  const y = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    try {
      const point = pathRef.current.getPointAtLength(val);
      return point ? point.y : 0;
    } catch {
      return 0;
    }
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  const pathD = dimensions?.width > 0 && dimensions?.height > 0
    ? `M 0 0 H ${dimensions.width} V ${dimensions.height} H 0 Z`
    : '';

  return (
    <div className="absolute inset-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}>
        {pathD && (
          <path
            fill="none"
            d={pathD}
            ref={pathRef}
          />
        )}
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}>
        {children}
      </motion.div>
    </div>
  );
};

export const MovingBorderButton = ({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  hoverColor = "#0ea5e9",
  variant = "button",
  color = "cyan",
  ...otherProps
}) => {
  const [isReady, setIsReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [randomOffset] = useState(() => Math.random());
  const containerRef = useRef(null);

  const isTag = variant === "tag";

  const tagColors = {
    cyan: "#06b6d4",
    purple: "#a855f7",
  };
  const borderColor = tagColors[color] || tagColors.cyan;
  const computedBorderRadius = isTag ? "0.75rem" : borderRadius;

  // Misura dimensioni dal componente padre
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Pre-warm il blur layer
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsReady(true);
    });
  }, []);

  return (
    <Component
      ref={containerRef}
      className={cn(
        "relative bg-transparent p-[1px]",
        isTag ? "h-auto w-auto" : "h-16 w-40 text-xl",
        containerClassName
      )}
      style={{
        borderRadius: computedBorderRadius,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...otherProps}>
      {/* Glow effect on hover - solo per button */}
      {!isTag && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            borderRadius: computedBorderRadius,
            opacity: isHovered ? 0.6 : 0,
            boxShadow: `0 8px 16px -4px ${hoverColor}`,
          }}
        />
      )}

      {/* Moving border con CSS mask per mostrare solo l'anello */}
      <div
        className="absolute inset-0 pointer-events-none p-[1px] overflow-hidden"
        style={{
          borderRadius: computedBorderRadius,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}>
        <MovingBorder duration={duration || (isTag ? 2500 : 3000)} rx="30%" ry="30%" dimensions={dimensions} randomOffset={isTag ? randomOffset : 0}>
          <div
            className={cn(
              isTag
                ? "h-20 w-20 opacity-90"
                : "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName
            )}
            style={isTag ? {
              background: `radial-gradient(circle, ${borderColor} 40%, transparent 60%)`
            } : undefined}
          />
        </MovingBorder>
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center antialiased",
          isTag
            ? "text-white px-3 py-1.5 border border-slate-700 bg-slate-950/80"
            : "text-sm text-white",
          className
        )}
        style={{
          borderRadius: `calc(${computedBorderRadius} * 0.96)`,
          willChange: "backdrop-filter",
          transform: "translateZ(0)",
          WebkitBackdropFilter: "blur(8px)",
          backdropFilter: "blur(8px)",
          isolation: "isolate",
          backfaceVisibility: "hidden",
          perspective: 1000,
          contain: "layout style paint",
          opacity: isReady ? 1 : 0,
          transition: isReady ? "opacity 0.15s ease-out" : "none",
        }}>
        {children}
      </div>
    </Component>
  );
};