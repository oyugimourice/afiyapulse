import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/services/auth.service';
import { getErrorMessage } from '@/services/api.client';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-danger-50 border border-danger-200 text-danger-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="doctor@example.com"
            required
            autoComplete="email"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500" />
            <span className="ml-2 text-sm text-secondary-600">Remember me</span>
          </label>
          
          <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
            Forgot password?
          </Link>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <span className="spinner w-4 h-4 mr-2"></span>
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-secondary-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}

// Made with Bob
