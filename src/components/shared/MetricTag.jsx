import { cn } from '@/lib/utils';

const presetColors = {
  cyan: '#22d3ee',
  purple: '#a855f7',
  blue: '#3b82f6',
  emerald: '#10b981',
  red: '#ef4444',
};

const MetricTag = ({
  text,
  color = 'cyan',
  className
}) => {
  // Supporta sia preset che hex diretto
  const hexColor = presetColors[color] || color;

  return (
    <span
      className={cn(
        'text-body-sm px-3 py-1.5 rounded-xl border inline-block',
        className
      )}
      style={{
        color: hexColor,
        borderColor: `${hexColor}40`,
      }}
    >
      {text}
    </span>
  );
};

export default MetricTag;
