import { cn } from '@/lib/utils';

const colorStyles = {
  cyan: {
    gradient: 'from-cyan-400 to-cyan-600',
    glow: 'bg-cyan-400',
  },
  blue: {
    gradient: 'from-blue-400 to-blue-600',
    glow: 'bg-blue-400',
  },
  purple: {
    gradient: 'from-purple-400 to-purple-600',
    glow: 'bg-purple-400',
  },
  emerald: {
    gradient: 'from-emerald-400 to-emerald-600',
    glow: 'bg-emerald-400',
  },
};

const sizes = {
  sm: {
    outer: 'w-10 h-10',
    inner: 'w-8 h-8',
    icon: 'w-4 h-4',
  },
  md: {
    outer: 'w-12 h-12 md:w-14 md:h-14',
    inner: 'w-10 h-10 md:w-12 md:h-12',
    icon: 'w-5 h-5 md:w-6 md:h-6',
  },
  lg: {
    outer: 'w-14 h-14 md:w-16 md:h-16',
    inner: 'w-12 h-12 md:w-14 md:h-14',
    icon: 'w-6 h-6 md:w-7 md:h-7',
  },
};

const IconBox = ({
  icon,
  color = 'cyan',
  size = 'md',
  active = false,
  className
}) => {
  const colorClasses = colorStyles[color] || colorStyles.cyan;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <div className={cn('relative flex items-center justify-center', sizeClasses.outer, className)}>
      {/* Background glow */}
      <div
        className={cn(
          'absolute inset-0 rounded-xl opacity-20 blur-sm',
          colorClasses.glow,
          active && 'animate-pulse'
        )}
      />
      {/* Icon container */}
      <div
        className={cn(
          'relative rounded-lg bg-gradient-to-br flex items-center justify-center',
          colorClasses.gradient,
          sizeClasses.inner
        )}
      >
        <div className={cn('text-white', sizeClasses.icon)}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default IconBox;
