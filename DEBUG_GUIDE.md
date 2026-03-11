# TerraFund Mobile App - Debugging Guide

## 🚨 Issue: Auth Integration Not Working

### Symptoms:
- Signup button not responding
- No network requests being made
- Database not receiving data
- App appears static

## 🔧 Debugging Steps

### 1. **Check Your IP Address**
The most common issue is using `localhost` which doesn't work on mobile devices.

**Find your IP address:**
```bash
# Windows
ipconfig
# Look for "IPv4 Address" under your active network adapter

# Mac/Linux  
ifconfig
# Look for "inet" address
```

**Update the API URL:**
Edit `src/utils/api.ts` line 6:
```typescript
const API_BASE_URL = 'http://YOUR_IP_ADDRESS:8080'; // Replace with your actual IP
```

### 2. **Verify Backend is Running**
```bash
cd microservices-springboot
docker-compose up
```

Check that you see:
- User service starting on port 8080
- Database connection successful
- No startup errors

### 3. **Test API Directly**
Open browser or use Postman to test:
```
GET http://YOUR_IP:8080/api/auth/verify-email?token=test
```
Should return a response (even an error means it's working).

### 4. **Check Mobile App Console**
1. Open the mobile app in Expo
2. Open developer console (Expo Dev Tools)
3. Look for these log messages:
   - `"Signup button clicked!"`
   - `"Form data: {...}"`
   - `"Signup request URL: http://..."`
   - `"Signup response received"`

### 5. **Network Issues**

#### For Physical Device:
- Ensure device and computer are on same WiFi network
- Check firewall settings on your computer
- Try disabling VPN

#### For Simulator:
- iOS Simulator: Should work with localhost
- Android Emulator: Use `10.0.2.2:8080` instead of localhost

### 6. **CORS Issues**
If you see CORS errors in the backend logs, add this to your Spring Boot backend:

```java
// In your main application class or configuration
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOriginPatterns(Arrays.asList("*"));
    configuration.setAllowedMethods(Arrays.asList("*"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### 7. **React Native Debugging**

**Enable Remote Debugging:**
1. Shake device/emulator (or press `Ctrl+M`/`Cmd+M`)
2. Select "Debug JS Remotely"
3. Opens Chrome DevTools
4. Check Console tab for errors

**Network Tab:**
- In Chrome DevTools, go to Network tab
- Try signup again
- See if request is being made
- Check request/response details

### 8. **Common Issues & Solutions**

| Issue | Cause | Solution |
|-------|--------|----------|
| "Network request failed" | Wrong IP/port | Update API_BASE_URL |
| "CORS error" | Backend blocking requests | Add CORS configuration |
| "Connection refused" | Backend not running | Start backend services |
| "Timeout" | Firewall blocking | Disable firewall or add exception |

### 9. **Quick Test Script**
Add this to your signup screen temporarily to test connectivity:

```typescript
// Add to handleSignup function for testing
const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify-email?token=test`);
    console.log('Test connection response:', response.status);
  } catch (error) {
    console.error('Connection test failed:', error);
  }
};
```

### 10. **Verify AsyncStorage**
If using physical device, AsyncStorage might have issues:

```bash
# Clear AsyncStorage
npx expo install @react-native-async-storage/async-storage
```

## 🚀 Expected Working Flow

1. **Click signup button** → Console shows "Signup button clicked!"
2. **Form validation** → Shows form data in console
3. **API request** → Shows "Signup request URL" and "Signup data"
4. **Backend response** → Shows "Signup response received" and status
5. **Success/Error** → Shows result or error in console

## 📱 Testing Checklist

- [ ] Backend running on correct port
- [ ] Correct IP address in API_BASE_URL
- [ ] Device/emulator on same network as computer
- [ ] No firewall blocking port 8080
- [ ] CORS configured in backend
- [ ] Console logs showing API calls
- [ ] Network tab showing requests

## 🔍 Debug Commands

```bash
# Check if port is accessible
telnet YOUR_IP 8080

# Check network connectivity
ping YOUR_IP

# Check Expo logs
expo start --web
```

Follow these steps systematically and you should identify the issue!
