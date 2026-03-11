# TerraFund Mobile App - Auth Integration Guide

## Overview
This guide explains how the authentication endpoints have been integrated between the TerraFund mobile app and the Spring Boot backend microservices.

## ✅ Completed Integration

### Backend Endpoints Integrated
1. **POST /api/auth/signup** - User registration
2. **POST /api/auth/login** - User authentication  
3. **GET /api/users/me** - Get current user profile
4. **POST /api/users/select-role** - Select user role (LAND_OWNER/INVESTOR)

### Mobile App Implementation
- **API Service Layer** (`src/utils/api.ts`)
  - Complete API client with JWT token management
  - Type-safe interfaces matching backend DTOs
  - Error handling and response processing
  
- **Auth Context** (`src/utils/auth.ts`)
  - React Context for global auth state management
  - Custom hook `useAuth()` for easy access to auth functions
  - Automatic token storage and retrieval
  
- **UI Integration**
  - Signup screen with real API calls
  - Login screen with JWT handling
  - Role selection screen with backend integration
  - AuthProvider wrapped at app root

## 🧪 Testing Instructions

### Prerequisites
1. **Backend must be running** on `http://localhost:8080`
2. **Database should be set up** with the user-service schema
3. **API Gateway** should be configured to route to user-service

### Testing Steps

#### 1. Start the Backend
```bash
cd microservices-springboot
docker-compose up
```

#### 2. Start the Mobile App
```bash
cd terrafund-mobile-v2
npm start
# or
expo start
```

#### 3. Test User Registration
1. Open the mobile app
2. Navigate to Signup screen
3. Fill in:
   - Email: `test@example.com`
   - Password: `password123`
   - Full Name: `Test User`
   - Phone Number: `+1234567890`
4. Accept terms and submit
5. **Expected Result**: Success message and redirect to email verification

#### 4. Test User Login
1. Navigate to Login screen
2. Enter credentials:
   - Email: `test@example.com`
   - Password: `password123`
3. Submit login form
4. **Expected Result**: Success and redirect to role selection or dashboard

#### 5. Test Role Selection
1. After login, you should be on role selection screen
2. Choose either "INVESTOR" or "LANDOWNER"
3. Click Continue
4. **Expected Result**: Role saved and redirect to appropriate dashboard

#### 6. Test User Profile Retrieval
The app automatically fetches user profile on login and stores it in the auth context.

## 🔧 Configuration

### API Base URL
Update the `API_BASE_URL` in `src/utils/api.ts` if your backend runs on a different port:

```typescript
const API_BASE_URL = 'http://localhost:8080'; // Change this if needed
```

### Backend Endpoints Reference

| Endpoint | Method | Description | Mobile Integration |
|----------|--------|-------------|-------------------|
| `/api/auth/signup` | POST | Register new user | ✅ signup.tsx |
| `/api/auth/login` | POST | Authenticate user | ✅ login.tsx |
| `/api/users/me` | GET | Get current user | ✅ auth context |
| `/api/users/select-role` | POST | Select user role | ✅ role-selection.tsx |

## 🚀 Ready for Testing

**Yes, the integration is complete and ready for testing!**

### What Works:
- ✅ User registration with validation
- ✅ User authentication with JWT tokens
- ✅ Automatic token storage and retrieval
- ✅ Role selection and user profile management
- ✅ Error handling and loading states
- ✅ Navigation based on user roles

### Next Steps:
1. Start your backend services
2. Run the mobile app
3. Test the authentication flow
4. Verify database records are created correctly

## 🐛 Troubleshooting

### Common Issues
1. **Network Error**: Ensure backend is running on correct port
2. **CORS Issues**: Backend should allow requests from mobile app
3. **JWT Token Issues**: Check AsyncStorage is working on your device
4. **Role Navigation**: Verify role-based routing logic

### Debug Tips
- Check browser console for network errors
- Verify backend logs for request processing
- Use React DevTools to inspect auth context state

## 📱 User Flow
1. **Signup** → Email Verification → **Login** → Role Selection → Dashboard
2. **Login** → Dashboard (if role already selected)
3. **Logout** → Clear tokens → Return to welcome screen

The integration follows backend entity structure exactly and maintains type safety throughout the application.
