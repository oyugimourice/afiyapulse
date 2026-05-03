import clsx from 'clsx';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export default function Spinner({
  size = 'md',
  color = 'primary',
  className,
}: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colors = {
    primary: 'border-primary-600',
    secondary: 'border-secondary-600',
    white: 'border-white',
  };

  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-2 border-secondary-300',
        sizes[size],
        `border-t-${colors[color]}`,
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Made with Bob
