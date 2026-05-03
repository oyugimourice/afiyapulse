import { ReactNode } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

const styles = {
  success: 'bg-success-50 border-success-200 text-success-800',
  error: 'bg-danger-50 border-danger-200 text-danger-800',
  warning: 'bg-warning-50 border-warning-200 text-warning-800',
  info: 'bg-primary-50 border-primary-200 text-primary-800',
};

const iconStyles = {
  success: 'text-success-600',
  error: 'text-danger-600',
  warning: 'text-warning-600',
  info: 'text-primary-600',
};

export default function Alert({
  type = 'info',
  title,
  children,
  className,
  onClose,
}: AlertProps) {
  const Icon = icons[type];

  return (
    <div
      className={clsx(
        'flex items-start p-4 rounded-lg border',
        styles[type],
        className
      )}
      role="alert"
    >
      <Icon className={clsx('w-5 h-5 flex-shrink-0 mt-0.5', iconStyles[type])} />
      
      <div className="ml-3 flex-1">
        {title && <h3 className="font-medium mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close alert"
        >
          <XCircleIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// Made with Bob
