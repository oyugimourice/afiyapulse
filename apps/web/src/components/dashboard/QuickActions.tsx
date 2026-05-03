import { useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  UserPlusIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Card from '@/components/ui/Card';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  path: string;
}

const actions: QuickAction[] = [
  {
    id: 'new-consultation',
    title: 'New Consultation',
    description: 'Start a new patient consultation',
    icon: PlusIcon,
    color: 'bg-primary-50 text-primary-600',
    path: '/consultations/new',
  },
  {
    id: 'add-patient',
    title: 'Add Patient',
    description: 'Register a new patient',
    icon: UserPlusIcon,
    color: 'bg-success-50 text-success-600',
    path: '/patients?action=new',
  },
  {
    id: 'review-documents',
    title: 'Review Documents',
    description: 'Review pending documents',
    icon: ClipboardDocumentCheckIcon,
    color: 'bg-warning-50 text-warning-600',
    path: '/review',
  },
  {
    id: 'view-history',
    title: 'Consultation History',
    description: 'View past consultations',
    icon: DocumentTextIcon,
    color: 'bg-secondary-50 text-secondary-600',
    path: '/consultations/history',
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={() => navigate(action.path)}
              className="flex items-start p-4 rounded-lg border border-secondary-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-left group"
            >
              <div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="font-medium text-secondary-900 group-hover:text-primary-700">
                  {action.title}
                </h3>
                <p className="text-sm text-secondary-600 mt-1">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

// Made with Bob
