import { Stack } from 'expo-router';
import { useFontLoader } from '@/hooks/use-font-loader';
import { View, ActivityIndicator } from 'react-native';
import { AuthProvider } from '@/src/utils/auth';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const { fontsLoaded, fontError } = useFontLoader();

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#11d421" />
      </View>
    );
  }

  return (
    <>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(landowner-tabs)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </AuthProvider>
      <Toast />
    </>
  );
}
