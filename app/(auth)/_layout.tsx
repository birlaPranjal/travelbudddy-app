import { Stack } from 'expo-router';
import AuthLayout from '@/app/components/AuthLayout';

export default function AuthLayout() {
  return (
    <AuthLayout>
      <Stack>
        <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
        <Stack.Screen name="reset-password" options={{ title: 'Reset Password' }} />
        <Stack.Screen name="verify-email" options={{ title: 'Verify Email' }} />
      </Stack>
    </AuthLayout>
  );
}