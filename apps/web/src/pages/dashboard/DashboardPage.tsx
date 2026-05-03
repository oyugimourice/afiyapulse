import { useEffect, useState } from 'react';
import {
  UsersIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import StatCard from '@/components/dashboard/StatCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import ConsultationChart from '@/components/dashboard/ConsultationChart';
import QuickActions from '@/components/dashboard/QuickActions';
import Alert from '@/components/ui/Alert';
import Spinner from '@/components/ui/Spinner';
import { dashboardService, DashboardData } from '@/services/dashboard.service';
import { getErrorMessage } from '@/services/api.client';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const dashboardData = await dashboardService.getDashboardData();
      setData(dashboardData);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-secondary-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-6">Dashboard</h1>
        <Alert type="error" title="Error loading dashboard">
          {error}
          <button
            onClick={loadDashboardData}
            className="mt-2 text-sm font-medium text-danger-700 hover:text-danger-800 underline"
          >
            Try again
          </button>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-6">Dashboard</h1>
        <Alert type="info">No data available</Alert>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
        <button
          onClick={loadDashboardData}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Patients"
          value={data.stats.totalPatients}
          icon={<UsersIcon className="w-6 h-6" />}
          color="primary"
          trend={{
            value: 12,
            isPositive: true,
          }}
        />
        
        <StatCard
          title="Consultations Today"
          value={data.stats.consultationsToday}
          icon={<DocumentTextIcon className="w-6 h-6" />}
          color="success"
          trend={{
            value: 8,
            isPositive: true,
          }}
        />
        
        <StatCard
          title="Pending Reviews"
          value={data.stats.pendingReviews}
          icon={<ClipboardDocumentCheckIcon className="w-6 h-6" />}
          color="warning"
        />
        
        <StatCard
          title="Completed Today"
          value={data.stats.completedToday}
          icon={<CheckCircleIcon className="w-6 h-6" />}
          color="success"
          trend={{
            value: 15,
            isPositive: true,
          }}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <QuickActions />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Consultation Trends - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ConsultationChart
            data={data.consultationTrends}
            isLoading={false}
          />
        </div>

        {/* Recent Activity - Takes 1 column */}
        <div className="lg:col-span-1">
          <ActivityFeed
            activities={data.recentActivity}
            isLoading={false}
          />
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Performance Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-secondary-600">Total Consultations</span>
              <span className="font-semibold text-secondary-900">
                {data.stats.totalConsultations}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary-600">Avg. Consultation Time</span>
              <span className="font-semibold text-secondary-900">
                {data.stats.averageConsultationTime} min
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary-600">Completion Rate</span>
              <span className="font-semibold text-success-600">
                {data.stats.completedToday > 0
                  ? Math.round((data.stats.completedToday / data.stats.consultationsToday) * 100)
                  : 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Upcoming Appointments
          </h3>
          {data.upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {data.upcomingAppointments.slice(0, 3).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-secondary-900">
                      {appointment.patientName}
                    </p>
                    <p className="text-sm text-secondary-600">
                      {appointment.type}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-primary-600">
                    {new Date(appointment.time).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary-600 text-center py-4">
              No upcoming appointments
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Made with Bob
