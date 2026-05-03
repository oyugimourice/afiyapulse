import { ReactNode } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Card from '@/components/ui/Card';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export default function StatCard({
  title,
  value,
  icon,
  trend,
  color = 'primary',
}: StatCardProps) {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-50',
    success: 'text-success-600 bg-success-50',
    warning: 'text-warning-600 bg-warning-50',
    danger: 'text-danger-600 bg-danger-50',
  };

  return (
    <Card className="hover:shadow-medium transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-secondary-900">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              {trend.isPositive ? (
                <ArrowUpIcon className="w-4 h-4 text-success-600 mr-1" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 text-danger-600 mr-1" />
              )}
              <span
                className={clsx(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-success-600' : 'text-danger-600'
                )}
              >
                {Math.abs(trend.value)}%
              </span>
              <span className="text-sm text-secondary-500 ml-1">vs last week</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={clsx('p-3 rounded-lg', colorClasses[color])}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

// Made with Bob
