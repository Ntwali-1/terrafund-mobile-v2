// API Configuration and Service Layer
import { Platform } from 'react-native';
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

export interface LandResponse {
  id: number;
  ownerId: number;
  province: string;
  district: string;
  sector: string;
  areaSqMeters: number;
  availabilityType: AvailabilityType;
  status: LandStatus;
  imageUrls: string[];
  documentUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LandSummaryResponse {
  id: number;
  province: string;
  district: string;
  sector: string;
  areaSqMeters: number;
  availabilityType: AvailabilityType;
  status: LandStatus;
  thumbnailUrl?: string;
}

export interface CreateLandRequest {
  province: string;
  district: string;
  sector: string;
  areaSqMeters: number;
  availabilityType: AvailabilityType;
  imageUrls: string[];
  documentUrls: string[];
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface FileUploadResponse {
  publicId: string;
  url: string;
  secureUrl: string;
  format: string;
  resourceType: string;
  size: number;
  width?: number;
  height?: number;
  message: string;
}

export enum AvailabilityType {
  SALE = 'SALE',
  RENT = 'RENT',
  HARVEST_SHARE = 'HARVEST_SHARE',
  SALE_OR_RENT = 'SALE_OR_RENT',
  ALL = 'ALL'
}

export enum LandStatus {
  AVAILABLE = 'AVAILABLE',
  PENDING = 'PENDING',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
  UNDER_CONTRACT = 'UNDER_CONTRACT',
  WITHDRAWN = 'WITHDRAWN'
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

  private async getAuthHeaders(isMultipart = false): Promise<HeadersInit> {
    const token = await AsyncStorage.getItem('jwtToken');
    return {
      ...(isMultipart ? {} : { 'Content-Type': 'application/json' }),
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
    const result = await this.handleResponse<{ message: string; user: UserResponse }>(response);
    
    // Crucial: Update the stored JWT token if the backend returned a new one
    if (result.user && result.user.jwtToken) {
      console.log('Updating JWT token after role selection');
      await AsyncStorage.setItem('jwtToken', result.user.jwtToken);
    }
    
    return result;
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

  // Land Endpoints
  async createLand(data: CreateLandRequest): Promise<LandResponse> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}/api/lands`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async getMyLands(page = 0, size = 10): Promise<PageResponse<LandSummaryResponse>> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}/api/lands/my?page=${page}&size=${size}`, {
      method: 'GET',
      headers,
    });
    return this.handleResponse(response);
  }

  async getLands(page = 0, size = 10): Promise<PageResponse<LandSummaryResponse>> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}/api/lands?page=${page}&size=${size}`, {
      method: 'GET',
      headers,
    });
    return this.handleResponse(response);
  }

  async getLandById(id: number): Promise<LandResponse> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}/api/lands/${id}`, {
      method: 'GET',
      headers,
    });
    return this.handleResponse(response);
  }

  // File Storage Endpoints
  async uploadFile(fileUri: string, folder = 'uploads', customName?: string, customType?: string): Promise<FileUploadResponse> {
    const headers = await this.getAuthHeaders(true);
    const formData = new FormData();

    // Create the file object
    const filename = customName || fileUri.split('/').pop() || 'file';
    let type = customType;

    if (!type) {
      const match = /\.(\w+)$/.exec(filename);
      const ext = match ? match[1].toLowerCase() : '';

      type = 'image/jpeg'; // fallback
      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
        type = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
      } else if (ext === 'pdf') {
        type = 'application/pdf';
      } else if (ext === 'doc') {
        type = 'application/msword';
      } else if (ext === 'docx') {
        type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      }
    }

    console.log(`Uploading file: ${filename}, type: ${type}, folder: ${folder}`);

    if (Platform.OS === 'web') {
      // In web, we need to fetch the local URI to get a Blob for FormData
      console.log('Web platform detected, fetching blob for upload');
      try {
        const response = await fetch(fileUri);
        const blob = await response.blob();
        formData.append('file', blob, filename);
      } catch (e) {
        console.error('Failed to fetch blob for web upload:', e);
        throw new Error('Failed to prepare file for upload in web browser');
      }
    } else {
      // Native platforms can use the {uri, name, type} object
      formData.append('file', {
        uri: fileUri,
        name: filename,
        type,
      } as any);
    }

    formData.append('folder', folder);

    const response = await fetch(`${this.baseURL}/api/files/upload`, {
      method: 'POST',
      headers,
      body: formData,
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
