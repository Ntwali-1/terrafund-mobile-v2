# TerraFund Mobile App - Development Guide

## Overview
TerraFund is a mobile application for agricultural investment, connecting investors with land owners. The app features role-based dashboards and a complete authentication flow.

## Tech Stack
- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **UI**: React Native components with custom styling
- **Icons**: @expo/vector-icons (MaterialIcons)
- **State Management**: React hooks (ready for Redux/Context API integration)

## Project Structure

```
terrafund-mobile-v2/
├── app/
│   ├── index.tsx                    # Entry point (redirects to auth)
│   ├── _layout.tsx                  # Root layout
│   │
│   ├── auth/                        # Authentication Flow
│   │   ├── _layout.tsx             # Auth stack layout
│   │   ├── welcome.tsx             # Welcome/landing screen
│   │   ├── login.tsx               # Login screen
│   │   ├── signup.tsx              # Registration screen
│   │   ├── role-selection.tsx      # Choose role (Investor/Land Owner)
│   │   └── verify-email.tsx        # Email verification screen
│   │
│   ├── (tabs)/                      # Investor Dashboard (Tab Navigation)
│   │   ├── _layout.tsx             # Investor tabs layout
│   │   ├── index.tsx               # Investor home/dashboard
│   │   ├── explore.tsx             # Browse investment opportunities
│   │   ├── portfolio.tsx           # View active investments
│   │   ├── wallet.tsx              # Wallet & transactions
│   │   └── dashboard.tsx           # Additional dashboard view
│   │
│   └── (landowner-tabs)/            # Land Owner Dashboard (Tab Navigation)
│       ├── _layout.tsx             # Land owner tabs layout
│       ├── index.tsx               # Land owner home/dashboard
│       ├── my-lands.tsx            # Manage posted lands
│       ├── investors.tsx           # View connected investors
│       ├── earnings.tsx            # Track earnings
│       └── profile.tsx             # User profile & settings
│
├── components/                      # Reusable components
├── constants/
│   └── theme.ts                    # Color scheme & theme constants
├── hooks/
│   └── use-color-scheme.ts         # Dark/light mode hook
└── assets/                         # Images, fonts, etc.
```

## User Roles

### 1. INVESTOR
**Purpose**: Invest in agricultural projects and earn returns

**Features**:
- Browse available land investments
- View detailed farm information (ROI, risk level, location)
- Track portfolio performance
- Monitor crop growth progress
- Receive harvest payouts
- Manage wallet (deposit, withdraw, transfer)

**Navigation Tabs**:
- Home: Dashboard with stats and quick actions
- Explore: Browse investment opportunities
- Portfolio: Active investments tracking
- Wallet: Financial transactions
- Dashboard: Additional metrics view

### 2. LAND_OWNER
**Purpose**: List land for investment and manage farming operations

**Features**:
- Post land plots for investment
- Connect with potential investors
- Manage active farming projects
- Track project progress
- View earnings and payouts
- Respond to investor inquiries

**Navigation Tabs**:
- Dashboard: Overview of lands and projects
- My Lands: Manage posted land plots
- Investors: View and manage investor relationships
- Earnings: Track income and payouts
- Profile: Account settings

## Authentication Flow

```
Welcome Screen
    ↓
    ├─→ Sign Up → Verify Email → Role Selection → Dashboard
    └─→ Login → Role Selection (if not set) → Dashboard
```

### API Integration Points

The app is designed to integrate with the Spring Boot microservices backend:

**Auth Endpoints** (`/api/auth`):
- `POST /signup` - User registration
- `POST /login` - User authentication
- `GET /verify-email?token=` - Email verification
- `POST /resend-verification?email=` - Resend verification email

**User Endpoints** (`/api/users`):
- `GET /me` - Get current user profile
- `PUT /me` - Update user profile
- `POST /select-role` - Set user role (INVESTOR/LAND_OWNER)

**Land Endpoints** (`/api/lands`):
- `GET /` - List available lands
- `POST /` - Create new land listing (Land Owner)
- `GET /{id}` - Get land details
- `PUT /{id}` - Update land information

**Investment Endpoints** (`/api/investments`):
- `GET /` - List user investments
- `POST /` - Create new investment
- `GET /{id}` - Get investment details
- `GET /investor/stats` - Get investor statistics

## Design System

### Colors
```typescript
Primary: #11d421 (Green)
Success: #11d421
Warning: #f59e0b
Danger: #ef4444
Info: #3b82f6

Light Mode:
- Background: #f9fafb
- Card: #ffffff
- Text: #0d1b0f
- Text Secondary: #6b7280

Dark Mode:
- Background: #102212
- Card: #1a3a1f
- Text: #ffffff
- Text Secondary: #9ca3af
```

### Typography
- **Headers**: 24-32px, weight 800
- **Titles**: 18-20px, weight 700
- **Body**: 14-16px, weight 400-600
- **Captions**: 12px, weight 500

### Spacing
- **Section padding**: 16px
- **Card padding**: 16-24px
- **Gap between elements**: 8-16px
- **Border radius**: 12px (cards), 8px (buttons)

## Key Features Implemented

### ✅ Authentication
- Welcome/onboarding screen
- Login with email/password
- Registration with validation
- Email verification flow
- Role selection (Investor/Land Owner)
- Social login placeholder (Google)

### ✅ Investor Dashboard
- Portfolio overview with stats
- Investment opportunities browser
- Active investments tracking
- Crop growth progress indicators
- Wallet management
- Transaction history
- Harvest payout notifications

### ✅ Land Owner Dashboard
- Land management overview
- Active projects tracking
- Investor inquiries
- Earnings tracking
- Plot verification status
- Activity feed

### ✅ UI/UX Features
- Dark mode support
- Smooth animations
- Pull-to-refresh (ready)
- Loading states
- Error handling
- Form validation
- Responsive design

## Next Steps for Integration

### 1. API Service Layer
Create `services/api.ts`:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://your-api-url.com';

export const api = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    await AsyncStorage.setItem('token', data.token);
    return data;
  },
  // Add more API methods...
};
```

### 2. Authentication Context
Create `contexts/AuthContext.tsx`:
```typescript
import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Implementation...
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 3. Protected Routes
Update `app/_layout.tsx` to check authentication:
```typescript
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';

export default function RootLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;
  if (!user) return <Redirect href="/auth/welcome" />;

  return <Stack>...</Stack>;
}
```

### 4. Environment Variables
Create `.env`:
```
API_BASE_URL=http://localhost:8080
GOOGLE_CLIENT_ID=your-google-client-id
```

## Running the App

### Development
```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### Building for Production
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## Testing Checklist

- [ ] Authentication flow (signup, login, logout)
- [ ] Role selection and navigation
- [ ] Investor dashboard functionality
- [ ] Land owner dashboard functionality
- [ ] Dark mode toggle
- [ ] Form validation
- [ ] API error handling
- [ ] Offline mode handling
- [ ] Push notifications
- [ ] Deep linking

## Design Principles

1. **Consistency**: Maintain consistent spacing, colors, and typography
2. **Accessibility**: Ensure proper contrast ratios and touch targets
3. **Performance**: Optimize images and minimize re-renders
4. **User Feedback**: Provide loading states and error messages
5. **Progressive Disclosure**: Show information gradually to avoid overwhelming users

## Additional Features to Implement

### High Priority
- [ ] Complete API integration
- [ ] Real-time notifications
- [ ] Image upload for land listings
- [ ] Payment gateway integration
- [ ] Document verification

### Medium Priority
- [ ] Chat/messaging between investors and land owners
- [ ] Advanced filtering and search
- [ ] Investment calculator
- [ ] Harvest calendar
- [ ] Analytics dashboard

### Low Priority
- [ ] Social sharing
- [ ] Referral program
- [ ] Multi-language support
- [ ] Biometric authentication
- [ ] Offline mode

## Support & Documentation

- **Expo Docs**: https://docs.expo.dev/
- **React Native Docs**: https://reactnative.dev/
- **Expo Router**: https://expo.github.io/router/docs/

## Notes

- All screens support both light and dark modes
- The app uses Expo Router for navigation (file-based routing)
- Authentication state management is ready for integration
- All forms include validation logic
- The design follows Material Design principles with custom branding
- Icons are from MaterialIcons (included in @expo/vector-icons)

---

**Last Updated**: February 2026
**Version**: 1.0.0
**Status**: Ready for Backend Integration
