import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">
            AfiyaPulse
          </h1>
          <p className="text-secondary-600">
            AI-Powered Clinical Documentation
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-medium p-8">
          {children}
        </div>
        
        <div className="text-center mt-6 text-sm text-secondary-500">
          <p>&copy; 2026 AfiyaPulse. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
