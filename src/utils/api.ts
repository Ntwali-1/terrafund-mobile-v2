// API Configuration and Service Layer
import AsyncStorage from '@react-native-async-storage/async-storage';

import Constants from 'expo-constants';

const getApiBaseUrl = () => {
  // Constants.expoConfig.hostUri typically contains the IP:Port of the dev server
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    console.log('Dynamic API IP detected:', ip);
    return `http://${ip}:8080`;
  }
  // Fallback to the IP address from your ipconfig output (Wi-Fi adapter)
  return 'http://localhost:8080';
};

const API_BASE_URL = getApiBaseUrl();
console.log('Using API_BASE_URL:', API_BASE_URL);

// Types matching backend DTOs
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

export interface LoginResponse {
  jwtToken: string;
  user: UserResponse;
}

export interface UserResponse {
  id: number;
  email: string;
  fullName: string;
  phoneNumber?: string;
  isVerified: boolean;
  jwtToken?: string;
  isActive: boolean;
  roles: Role[];
  profilePictureUrl?: string;
  bio?: string;
  dateOfBirth?: string;
  country?: string;
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
  streetAddress?: string;
  idNumber?: string;
  idType?: string;
  verificationStatus?: string;
  verifiedAt?: string;
  profileCompletionPercentage?: number;
  averageRating?: number;
  totalRatings?: number;
  createdAt: string;
  updatedAt: string;
}

export interface RoleSelectionRequest {
  role: Role;
}

export enum Role {
  LAND_OWNER = 'LAND_OWNER',
  INVESTOR = 'INVESTOR'
}

// API Client Class
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const token = await AsyncStorage.getItem('jwtToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    console.log('API Response status:', response.status);
    console.log('API Response url:', response.url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Auth Endpoints
  async signup(data: SignupRequest): Promise<{ message: string; user: UserResponse }> {
    console.log('Signup request URL:', `${this.baseURL}/api/auth/signup`);
    console.log('Signup data:', data);

    const response = await fetch(`${this.baseURL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    console.log('Signup response received');
    return this.handleResponse(response);
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await this.handleResponse<LoginResponse>(response);

    // Store JWT token
    if (result.jwtToken) {
      await AsyncStorage.setItem('jwtToken', result.jwtToken);
    }

    return result;
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseURL}/api/auth/verify-email?token=${token}`, {
      method: 'GET',
    });
    return this.handleResponse(response);
  }

  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseURL}/api/auth/resend-verification?email=${email}`, {
      method: 'POST',
    });
    return this.handleResponse(response);
  }

  // User Endpoints
  async getCurrentUser(): Promise<UserResponse> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}/api/users/me`, {
      method: 'GET',
      headers,
    });
    return this.handleResponse(response);
  }

  async selectRole(role: Role): Promise<{ message: string; user: UserResponse }> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}/api/users/select-role`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ role }),
    });
    return this.handleResponse(response);
  }

  async updateCurrentUser(data: Partial<UserResponse>): Promise<{ message: string; user: UserResponse }> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}/api/users/me`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // Utility Methods
  async logout(): Promise<void> {
    await AsyncStorage.removeItem('jwtToken');
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem('jwtToken');
    return !!token;
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
