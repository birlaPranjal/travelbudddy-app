import { Stack, useRouter } from 'expo-router';
import Header from '@/app/components/Header';
import { useAuth } from '@/app/context/AuthContext';
import { useEffect } from 'react';

export default function AppLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/(auth)/sign-in');
    }
  }, [user, loading]);

  if (loading || !user) {
    return null; // or loading spinner
  }

  return (
    <>
      <Header />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="find-people" options={{ title: 'Find People' }} />
        <Stack.Screen name="itineraries" options={{ title: 'Itineraries' }} />
      </Stack>
    </>
  );
}