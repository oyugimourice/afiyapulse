import { useEffect } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
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

export default function Toast({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: ToastProps) {
  const Icon = icons[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={clsx(
        'flex items-start p-4 rounded-lg border shadow-medium animate-slide-in',
        styles[type]
      )}
    >
      <Icon className={clsx('w-6 h-6 flex-shrink-0', iconStyles[type])} />
      
      <div className="ml-3 flex-1">
        <p className="font-medium">{title}</p>
        {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
      </div>
      
      <button
        onClick={() => onClose(id)}
        className="ml-4 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Close notification"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

// Made with Bob
