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

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface ApiDashboardStats {
  consultations: {
    total: number;
    today: number;
    completed: number;
    averageDuration: number;
  };
  patients: {
    total: number;
  };
  documentation: {
    pendingReviews: number;
    approvedToday: number;
  };
  performance: {
    averageConsultationTime: number;
  };
}

interface ApiRecentActivity {
  id: string;
  type: 'CONSULTATION' | 'APPROVAL' | 'PATIENT' | 'REFERRAL';
  title: string;
  description: string;
  timestamp: string | Date;
  metadata?: {
    status?: string;
  };
}

interface DashboardSummary {
  stats: ApiDashboardStats;
  activity: ApiRecentActivity[];
  trends: ConsultationTrend[];
}

const activityTypeMap: Record<ApiRecentActivity['type'], RecentActivity['type']> = {
  CONSULTATION: 'consultation',
  APPROVAL: 'review',
  PATIENT: 'patient',
  REFERRAL: 'review',
};

function normalizeStatus(status?: string): RecentActivity['status'] | undefined {
  const normalized = status?.toLowerCase();

  if (normalized === 'completed' || normalized === 'pending' || normalized === 'in_progress') {
    return normalized;
  }

  return undefined;
}

function mapStats(stats: ApiDashboardStats): DashboardStats {
  return {
    totalPatients: stats.patients.total,
    consultationsToday: stats.consultations.today,
    pendingReviews: stats.documentation.pendingReviews,
    completedToday: stats.documentation.approvedToday,
    totalConsultations: stats.consultations.total,
    averageConsultationTime:
      stats.performance.averageConsultationTime || stats.consultations.averageDuration,
  };
}

function mapActivity(activity: ApiRecentActivity): RecentActivity {
  return {
    id: activity.id,
    type: activityTypeMap[activity.type],
    title: activity.title,
    description: activity.description,
    timestamp: new Date(activity.timestamp),
    status: normalizeStatus(activity.metadata?.status),
  };
}

class DashboardService {
  async getDashboardData(): Promise<DashboardData> {
    const response = await apiClient.get<ApiResponse<DashboardSummary>>('/dashboard/summary');
    const summary = response.data.data;

    return {
      stats: mapStats(summary.stats),
      recentActivity: summary.activity.map(mapActivity),
      consultationTrends: summary.trends,
      upcomingAppointments: [],
    };
  }

  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<ApiResponse<ApiDashboardStats>>('/dashboard/stats');
    return mapStats(response.data.data);
  }

  async getRecentActivity(limit: number = 10): Promise<RecentActivity[]> {
    const response = await apiClient.get<ApiResponse<ApiRecentActivity[]>>('/dashboard/activity', {
      params: { limit },
    });
    return response.data.data.map(mapActivity);
  }

  async getConsultationTrends(days: number = 7): Promise<ConsultationTrend[]> {
    const response = await apiClient.get<ApiResponse<ConsultationTrend[]>>('/dashboard/consultations/trends', {
      params: { days },
    });
    return response.data.data;
  }
}

export const dashboardService = new DashboardService();

// Made with Bob
