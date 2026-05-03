import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/auth.service';
import { useState } from 'react';

export default function TopBar() {
  const { user } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
  };

  return (
    <header className="h-16 bg-white border-b border-secondary-200 flex items-center justify-between px-6">
      {/* Search or breadcrumbs could go here */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-secondary-900">
          Welcome back, {user?.name}
        </h2>
      </div>
      
      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button
          className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-lg transition-colors relative"
          aria-label="Notifications"
        >
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
        </button>
        
        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-2 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <UserCircleIcon className="w-8 h-8 text-secondary-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-secondary-900">{user?.name}</p>
              <p className="text-xs text-secondary-500">{user?.role}</p>
            </div>
          </button>
          
          {/* Dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-medium border border-secondary-200 py-1 z-50">
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  // Navigate to profile
                }}
                className="w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  // Navigate to settings
                }}
                className="w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
              >
                Settings
              </button>
              <hr className="my-1 border-secondary-200" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-danger-600 hover:bg-danger-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Made with Bob
