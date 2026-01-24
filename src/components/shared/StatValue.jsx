import { cn } from '@/lib/utils';

const colorGradients = {
  cyan: 'from-cyan-400 to-blue-500',
  blue: 'from-blue-400 to-indigo-500',
  green: 'from-green-400 to-emerald-500',
  purple: 'from-purple-400 to-pink-500',
  red: 'from-red-400 to-orange-500',
};

const sizes = {
  sm: {
    value: 'text-xl md:text-2xl',
    label: 'text-[10px]',
    description: 'text-[10px]',
  },
  md: {
    value: 'text-2xl md:text-3xl',
    label: 'text-xs',
    description: 'text-xs',
  },
  lg: {
    value: 'text-3xl md:text-4xl',
    label: 'text-sm',
    description: 'text-sm',
  },
};

const StatValue = ({
  value,
  label,
  description,
  color = 'cyan',
  size = 'md',
  className
}) => {
  const gradientClass = colorGradients[color] || colorGradients.cyan;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <p className={cn('text-slate-500 mb-0.5', sizeClasses.label)}>
          {label}
        </p>
      )}
      <p
        className={cn(
          'font-bold text-transparent bg-clip-text bg-gradient-to-r',
          gradientClass,
          sizeClasses.value
        )}
      >
        {value}
      </p>
      {description && (
        <p className={cn('text-slate-600 mt-0.5', sizeClasses.description)}>
          {description}
        </p>
      )}
    </div>
  );
};

export default StatValue;
