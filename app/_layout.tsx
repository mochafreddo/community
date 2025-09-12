import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

import { QueryClientProvider } from '@tanstack/react-query';

import queryClient from '@/api/queryClient';
import { useAuth } from '@/hooks/queries/useAuth';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
}

function RootNavigator() {
  const { auth } = useAuth();
  console.log('🚀 ~ RootNavigator ~ auth:', auth);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
