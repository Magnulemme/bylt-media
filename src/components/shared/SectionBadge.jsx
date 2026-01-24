import { cn } from '@/lib/utils';

const colors = {
  cyan: {
    text: 'text-cyan-400',
    border: 'border-cyan-400/40',
  },
  emerald: {
    text: 'text-emerald-400',
    border: 'border-emerald-400/40',
  },
  red: {
    text: 'text-red-400',
    border: 'border-red-400/40',
  },
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-400/40',
  },
  blue: {
    text: 'text-blue-400',
    border: 'border-blue-400/40',
  },
};

const SectionBadge = ({
  text,
  color = 'cyan',
  bordered = false,
  className
}) => {
  const colorClasses = colors[color] || colors.cyan;

  return (
    <span
      className={cn(
        'text-label tracking-[0.2em] uppercase',
        colorClasses.text,
        bordered && `px-3 py-1.5 rounded-xl border ${colorClasses.border}`,
        className
      )}
    >
      {text}
    </span>
  );
};

export default SectionBadge;
