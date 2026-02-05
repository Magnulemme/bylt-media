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
  paused = false,
  ...otherProps
}) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    if (paused || !pathRef.current) return;
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
        viewBox={dimensions?.width > 0 ? `0 0 ${dimensions.width} ${dimensions.height}` : undefined}
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
  paused = false,
  splitted = false, // Split text into 2 lines on very small screens (<420px)
  ...otherProps
}) => {
  const [isReady, setIsReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [randomOffset] = useState(() => Math.random());
  const containerRef = useRef(null);

  const isTag = variant === "tag";
  const isTitle = variant === "title";
  const isCard = variant === "card";

  const variantColors = {
    cyan: "#06b6d4",
    purple: "#a855f7",
  };
  const borderColor = color.startsWith("#") ? color : (variantColors[color] || variantColors.cyan);
  // Per title, schiarisce il colore del 30%
  const lightenColor = (hex, percent) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, (num >> 16) + Math.round((255 - (num >> 16)) * percent));
    const g = Math.min(255, ((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent));
    const b = Math.min(255, (num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  };
  const titleBorderColor = isTitle ? lightenColor(borderColor, 0.3) : borderColor;
  const computedBorderRadius = isTag || isTitle ? "0.75rem" : isCard ? "1rem" : borderRadius;

  // Misura dimensioni dal componente padre
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;
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
        isTag || isTitle ? "h-auto w-auto" : isCard ? "h-auto w-auto" : "h-16 w-40 text-xl",
        containerClassName
      )}
      style={{
        borderRadius: computedBorderRadius,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...otherProps}>
      {/* Glow effect on hover - per button e card */}
      {!isTag && !isTitle && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            borderRadius: computedBorderRadius,
            opacity: isHovered ? (isCard ? 0.4 : 0.6) : 0,
            boxShadow: `0 8px 16px -4px ${isCard ? borderColor : hoverColor}`,
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
        <MovingBorder duration={duration || (isTag || isTitle ? 2500 : isCard ? 3500 : 3000)} rx="30%" ry="30%" dimensions={dimensions} randomOffset={(isTag || isTitle || isCard) ? randomOffset : 0} paused={paused}>
          {(() => {
            // Calcola dimensione dot dinamica per card basata sul perimetro
            const dotSize = isCard
              ? Math.max(80, (dimensions.width + dimensions.height) * 0.4)
              : 80; // 80px = h-20/w-20 in Tailwind

            const effectiveColor = isTitle ? titleBorderColor : borderColor;

            return (
              <div
                className={cn(
                  "opacity-90",
                  !isTag && !isTitle && !isCard && "bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
                  borderClassName
                )}
                style={{
                  width: isTag || isTitle ? 80 : dotSize,
                  height: isTag || isTitle ? 80 : dotSize,
                  background: (isTag || isTitle || isCard)
                    ? `radial-gradient(circle, ${effectiveColor} 40%, transparent 60%)`
                    : undefined
                }}
              />
            );
          })()}
        </MovingBorder>
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center antialiased",
          isTag
            ? "text-white px-3 py-1.5 border border-slate-700 bg-slate-950/80"
            : isTitle
            ? "text-white px-4 py-2 border border-slate-700 bg-slate-950/80 text-body-lg font-bold"
            : isCard
            ? "text-white border border-slate-700 bg-slate-950/90"
            : "text-sm text-white",
          splitted && "tag-splitted",
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