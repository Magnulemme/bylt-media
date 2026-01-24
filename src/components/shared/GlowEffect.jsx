'use client';

import { cn } from '@/lib/utils';

const colorStyles = {
  cyan: {
    inner: 'rgba(103, 232, 249, 0.6)',
    outer: 'rgba(103, 232, 249, 0.3)',
  },
  blue: {
    inner: 'rgba(59, 130, 246, 0.6)',
    outer: 'rgba(59, 130, 246, 0.3)',
  },
  purple: {
    inner: 'rgba(168, 85, 247, 0.6)',
    outer: 'rgba(168, 85, 247, 0.3)',
  },
  emerald: {
    inner: 'rgba(16, 185, 129, 0.6)',
    outer: 'rgba(16, 185, 129, 0.3)',
  },
};

const intensities = {
  low: { blur: 10, scale: 1.2 },
  medium: { blur: 15, scale: 1.4 },
  high: { blur: 20, scale: 1.6 },
};

const GlowEffect = ({
  color = 'cyan',
  intensity = 'medium',
  animated = false,
  className
}) => {
  const colors = colorStyles[color] || colorStyles.cyan;
  const { blur, scale } = intensities[intensity] || intensities.medium;

  return (
    <>
      {/* Inner glow */}
      <div
        className={cn(
          'absolute inset-0 rounded-full pointer-events-none -z-10',
          animated && 'animate-pulse',
          className
        )}
        style={{
          background: `radial-gradient(circle, ${colors.inner} 0%, ${colors.outer} 50%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          transform: `scale(${scale})`,
        }}
      />
      {/* Outer ring */}
      <div
        className={cn(
          'absolute -inset-4 rounded-full pointer-events-none -z-20',
          animated && 'animate-pulse'
        )}
        style={{
          background: `radial-gradient(circle, transparent 40%, ${colors.outer} 60%, transparent 80%)`,
          filter: `blur(${blur}px)`,
        }}
      />
    </>
  );
};

export default GlowEffect;
