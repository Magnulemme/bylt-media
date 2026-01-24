import { cn } from '@/lib/utils';

const borderColors = {
  default: 'border-white/10',
  cyan: 'border-cyan-500/30',
  red: 'border-red-500/20',
  emerald: 'border-emerald-500/20',
  purple: 'border-purple-500/20',
};

const paddings = {
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

const CardBase = ({
  children,
  borderColor = 'default',
  padding = 'md',
  hover = false,
  className
}) => {
  return (
    <div
      className={cn(
        'relative bg-[#020617]/60 backdrop-blur-sm border rounded-2xl',
        borderColors[borderColor],
        paddings[padding],
        hover && 'transition-colors hover:border-cyan-400/60',
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardBase;
