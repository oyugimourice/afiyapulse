import { TextareaHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      resize = 'vertical',
      className,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };
    
    return (
      <div className={clsx('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-secondary-700 mb-1"
          >
            {label}
            {props.required && <span className="text-danger-500 ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            'w-full px-4 py-2 border rounded-lg transition-all',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            resizeClasses[resize],
            error
              ? 'border-danger-500 focus:ring-danger-500 focus:border-danger-500'
              : 'border-secondary-300 focus:ring-primary-500 focus:border-primary-500',
            'disabled:bg-secondary-50 disabled:text-secondary-500 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        
        {error && (
          <p className="mt-1 text-sm text-danger-600">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

// Made with Bob
