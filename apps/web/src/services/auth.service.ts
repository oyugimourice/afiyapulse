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

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    
    // Store auth data
    const { user, accessToken, refreshToken } = response.data.data;
    useAuthStore.getState().login(user, accessToken, refreshToken);
    
    return response.data.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
    
    // Store auth data
    const { user, accessToken, refreshToken } = response.data.data;
    useAuthStore.getState().login(user, accessToken, refreshToken);
    
    return response.data.data;
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

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await apiClient.post<ApiResponse<TokenResponse>>('/auth/refresh', {
      refreshToken,
    });
    
    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    useAuthStore.getState().setTokens(accessToken, newRefreshToken);
    
    return response.data.data;
  }

  async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await apiClient.get<ApiResponse<AuthResponse['user']>>('/auth/me');
    useAuthStore.getState().setUser(response.data.data);
    return response.data.data;
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
