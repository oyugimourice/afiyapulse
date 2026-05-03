import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  UsersIcon, 
  DocumentTextIcon, 
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Patients', href: '/patients', icon: UsersIcon },
  { name: 'New Consultation', href: '/consultations/new', icon: DocumentTextIcon },
  { name: 'Review Panel', href: '/review', icon: ClipboardDocumentCheckIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-secondary-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-secondary-200">
        <h1 className="text-xl font-bold text-primary-600">AfiyaPulse</h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-secondary-700 hover:bg-secondary-50'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-secondary-200">
        <p className="text-xs text-secondary-500 text-center">
          v1.0.0
        </p>
      </div>
    </div>
  );
}

// Made with Bob
