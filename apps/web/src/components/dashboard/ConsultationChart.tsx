import { useMemo } from 'react';
import { format } from 'date-fns';
import Card from '@/components/ui/Card';
import { ConsultationTrend } from '@/services/dashboard.service';

interface ConsultationChartProps {
  data: ConsultationTrend[];
  isLoading?: boolean;
}

export default function ConsultationChart({ data, isLoading }: ConsultationChartProps) {
  const maxValue = useMemo(() => {
    return Math.max(...data.map((d) => d.count), 1);
  }, [data]);

  if (isLoading) {
    return (
      <Card>
        <h2 className="text-xl font-semibold mb-4">Consultation Trends</h2>
        <div className="h-64 flex items-end justify-between space-x-2 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex-1 bg-secondary-200 rounded-t" style={{ height: `${Math.random() * 100}%` }} />
          ))}
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <h2 className="text-xl font-semibold mb-4">Consultation Trends</h2>
        <p className="text-secondary-600 text-center py-8">No data available</p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Consultation Trends</h2>
        <div className="flex items-center space-x-2 text-sm text-secondary-600">
          <span className="w-3 h-3 bg-primary-600 rounded"></span>
          <span>Consultations</span>
        </div>
      </div>
      
      {/* Simple Bar Chart */}
      <div className="h-64 flex items-end justify-between space-x-2">
        {data.map((item, index) => {
          const height = (item.count / maxValue) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center justify-end h-full">
                <div
                  className="w-full bg-primary-600 rounded-t hover:bg-primary-700 transition-colors cursor-pointer relative group"
                  style={{ height: `${height}%`, minHeight: item.count > 0 ? '8px' : '0' }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-secondary-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.count} consultations
                  </div>
                </div>
              </div>
              
              {/* X-axis label */}
              <div className="mt-2 text-xs text-secondary-600 text-center">
                {format(new Date(item.date), 'MMM dd')}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Y-axis labels */}
      <div className="mt-4 flex justify-between text-xs text-secondary-500">
        <span>0</span>
        <span>{Math.ceil(maxValue / 2)}</span>
        <span>{maxValue}</span>
      </div>
    </Card>
  );
}

// Made with Bob
