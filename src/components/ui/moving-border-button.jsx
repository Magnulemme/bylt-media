import { useState, useRef, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

// Moving Border Component
const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useAnimationFrame((time) => {
    if (!pathRef.current) return;

    try {
      const length = pathRef.current.getTotalLength();
      if (length && length > 0) {
        const pxPerMillisecond = length / duration;
        const progressValue = (time * pxPerMillisecond) % length;
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

  const pathD = dimensions.width > 0 && dimensions.height > 0
    ? `M 0 0 H ${dimensions.width} V ${dimensions.height} H 0 Z`
    : '';

  return (
    <div ref={containerRef} className="absolute inset-0">
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
  ...otherProps
}) => {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}>
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName
            )} />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}>
        {children}
      </div>
    </Component>
  );
};
