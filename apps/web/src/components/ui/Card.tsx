import { HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = 'default',
      padding = 'md',
      hover = false,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'bg-white shadow-soft',
      bordered: 'bg-white border border-secondary-200',
      elevated: 'bg-white shadow-medium',
    };
    
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-lg',
          variants[variant],
          paddings[padding],
          hover && 'transition-shadow hover:shadow-medium cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

// Made with Bob
