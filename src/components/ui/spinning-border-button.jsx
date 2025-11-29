import React, { useState } from 'react';

const SpinningBorderButton = ({
  children,
  href,
  className = '',
  height = 'h-16',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className={`relative inline-flex ${height} overflow-hidden rounded-md p-[2px] focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:ring-offset-2 focus:ring-offset-transparent ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Animated rotating gradient border - the "scia luminosa" effect */}
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#1e1b4b_50%,#06b6d4_100%)]" />

      {/* Button content */}
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-blue-950 px-10 py-1 text-base font-semibold font-mono text-white backdrop-blur-3xl hover:bg-slate-900/90 transition-all duration-300">
        {typeof children === 'function' ? children(isHovered) : children}
      </span>
    </a>
  );
};

export default SpinningBorderButton;
