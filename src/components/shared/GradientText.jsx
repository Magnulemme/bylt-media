import { cn } from '@/lib/utils';

const gradients = {
  primary: 'from-cyan-400 via-blue-500 to-purple-600',
  success: 'from-green-400 to-emerald-500',
  danger: 'from-red-400 to-orange-500',
  cyan: 'from-cyan-400 to-blue-500',
  purple: 'from-purple-400 to-pink-500',
};

const GradientText = ({
  children,
  as: Tag = 'span',
  gradient = 'primary',
  className
}) => {
  return (
    <Tag
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        gradients[gradient],
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default GradientText;
