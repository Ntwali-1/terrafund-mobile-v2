// Authentication Context and Hook
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiClient, UserResponse, LoginResponse } from './api';

interface AuthContextType {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  signup: (email: string, password: string, fullName: string, phoneNumber?: string) => Promise<{ message: string; user: UserResponse }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  selectRole: (role: 'LAND_OWNER' | 'INVESTOR') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuth = await apiClient.isAuthenticated();
      if (isAuth) {
        const currentUser = await apiClient.getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Token might be expired, clear it
      await apiClient.logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ email, password });
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string, fullName: string, phoneNumber?: string) => {
    try {
      console.log('AUTH CONTEXT: Calling apiClient.signup...');
      const response = await apiClient.signup({ email, password, fullName, phoneNumber });
      console.log('AUTH CONTEXT: apiClient.signup returned:', response);
      // Don't set user here - they need to verify email first
      return response;
    } catch (error) {
      console.error('AUTH CONTEXT: signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      // Force logout even if API call fails
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await apiClient.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If refresh fails, user might be logged out
      await logout();
    }
  };

  const selectRole = async (role: 'LAND_OWNER' | 'INVESTOR') => {
    try {
      const response = await apiClient.selectRole(role as any);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    refreshUser,
    selectRole,
  };

  return React.createElement(
    AuthContext.Provider,
    { value },
    children
  );
};
