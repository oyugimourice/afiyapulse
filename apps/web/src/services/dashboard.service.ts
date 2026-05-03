import apiClient from './api.client';

export interface DashboardStats {
  totalPatients: number;
  consultationsToday: number;
  pendingReviews: number;
  completedToday: number;
  totalConsultations: number;
  averageConsultationTime: number;
}

export interface RecentActivity {
  id: string;
  type: 'consultation' | 'review' | 'patient';
  title: string;
  description: string;
  timestamp: Date;
  status?: 'completed' | 'pending' | 'in_progress';
}

export interface ConsultationTrend {
  date: string;
  count: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: RecentActivity[];
  consultationTrends: ConsultationTrend[];
  upcomingAppointments: Array<{
    id: string;
    patientName: string;
    time: Date;
    type: string;
  }>;
}

class DashboardService {
  async getDashboardData(): Promise<DashboardData> {
    const response = await apiClient.get<DashboardData>('/dashboard');
    return response.data;
  }

  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/dashboard/stats');
    return response.data;
  }

  async getRecentActivity(limit: number = 10): Promise<RecentActivity[]> {
    const response = await apiClient.get<RecentActivity[]>('/dashboard/activity', {
      params: { limit },
    });
    return response.data;
  }

  async getConsultationTrends(days: number = 7): Promise<ConsultationTrend[]> {
    const response = await apiClient.get<ConsultationTrend[]>('/dashboard/trends', {
      params: { days },
    });
    return response.data;
  }
}

export const dashboardService = new DashboardService();

// Made with Bob
