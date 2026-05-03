import apiClient from './api.client';
import { useAuthStore } from '@/store/authStore';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: 'DOCTOR' | 'ADMIN';
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'DOCTOR' | 'ADMIN';
  };
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    
    // Store auth data
    const { user, accessToken, refreshToken } = response.data;
    useAuthStore.getState().login(user, accessToken, refreshToken);
    
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    
    // Store auth data
    const { user, accessToken, refreshToken } = response.data;
    useAuthStore.getState().login(user, accessToken, refreshToken);
    
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear auth state regardless of API call success
      useAuthStore.getState().logout();
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });
    
    const { user, accessToken, refreshToken: newRefreshToken } = response.data;
    useAuthStore.getState().login(user, accessToken, newRefreshToken);
    
    return response.data;
  }

  async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await apiClient.get<AuthResponse['user']>('/auth/me');
    useAuthStore.getState().setUser(response.data);
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/reset-password', {
      token,
      newPassword,
    });
  }

  async verifyEmail(token: string): Promise<void> {
    await apiClient.post('/auth/verify-email', { token });
  }
}

export const authService = new AuthService();

// Made with Bob
