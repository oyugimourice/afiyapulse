import { useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  duration?: number;
}

export function useToast() {
  const showToast = useCallback((message: string, type: ToastType = 'info', options?: ToastOptions) => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-0 ${getToastStyles(type)}`;
    toast.innerHTML = `
      <div class="flex items-center space-x-3">
        ${getToastIcon(type)}
        <span class="text-sm font-medium">${message}</span>
      </div>
    `;

    // Add to DOM
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 10);

    // Remove after duration
    const duration = options?.duration || 3000;
    setTimeout(() => {
      toast.style.transform = 'translateX(400px)';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, duration);
  }, []);

  return { showToast };
}

function getToastStyles(type: ToastType): string {
  switch (type) {
    case 'success':
      return 'bg-success-50 border border-success-200 text-success-800';
    case 'error':
      return 'bg-danger-50 border border-danger-200 text-danger-800';
    case 'warning':
      return 'bg-warning-50 border border-warning-200 text-warning-800';
    case 'info':
      return 'bg-info-50 border border-info-200 text-info-800';
    default:
      return 'bg-secondary-50 border border-secondary-200 text-secondary-800';
  }
}

function getToastIcon(type: ToastType): string {
  switch (type) {
    case 'success':
      return `
        <svg class="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      `;
    case 'error':
      return `
        <svg class="w-5 h-5 text-danger-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;
    case 'warning':
      return `
        <svg class="w-5 h-5 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      `;
    case 'info':
      return `
        <svg class="w-5 h-5 text-info-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `;
    default:
      return '';
  }
}

// Made with Bob
