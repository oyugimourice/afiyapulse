import { SelectHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      options,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className={clsx('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-secondary-700 mb-1"
          >
            {label}
            {props.required && <span className="text-danger-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={clsx(
              'w-full px-4 py-2 pr-10 border rounded-lg transition-all appearance-none',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              error
                ? 'border-danger-500 focus:ring-danger-500 focus:border-danger-500'
                : 'border-secondary-300 focus:ring-primary-500 focus:border-primary-500',
              'disabled:bg-secondary-50 disabled:text-secondary-500 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDownIcon className="w-5 h-5 text-secondary-400" />
          </div>
        </div>
        
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

Select.displayName = 'Select';

export default Select;

// Made with Bob
