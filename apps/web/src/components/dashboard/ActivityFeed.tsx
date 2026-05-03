import { formatDistanceToNow } from 'date-fns';
import {
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { RecentActivity } from '@/services/dashboard.service';

interface ActivityFeedProps {
  activities: RecentActivity[];
  isLoading?: boolean;
}

const activityIcons = {
  consultation: DocumentTextIcon,
  review: ClipboardDocumentCheckIcon,
  patient: UserPlusIcon,
};

const statusColors = {
  completed: 'success' as const,
  pending: 'warning' as const,
  in_progress: 'primary' as const,
};

export default function ActivityFeed({ activities, isLoading }: ActivityFeedProps) {
  if (isLoading) {
    return (
      <Card>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-secondary-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-secondary-200 rounded w-3/4" />
                  <div className="h-3 bg-secondary-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-secondary-600 text-center py-8">No recent activity</p>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type];
          
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-3 pb-4 border-b border-secondary-100 last:border-0 last:pb-0"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-secondary-900 truncate">
                    {activity.title}
                  </p>
                  {activity.status && (
                    <Badge
                      variant={statusColors[activity.status]}
                      size="sm"
                      className="ml-2"
                    >
                      {activity.status.replace('_', ' ')}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-secondary-600 mb-1">
                  {activity.description}
                </p>
                <p className="text-xs text-secondary-500">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// Made with Bob
