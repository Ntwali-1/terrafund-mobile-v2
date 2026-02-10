import { Redirect } from 'expo-router';

export default function Index() {
  // This will redirect to the auth flow
  // In production, check if user is authenticated and redirect accordingly
  return <Redirect href="/auth/welcome" />;
}
