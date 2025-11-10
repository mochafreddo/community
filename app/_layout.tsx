import 'react-native-reanimated';

import { useEffect } from 'react';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { queryClient } from '@/api/queryClient';
import { useAuth } from '@/hooks/queries/useAuth';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useReactQueryDevTools(queryClient);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
          <Toast />
        </QueryClientProvider>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const { auth } = useAuth();

  useEffect(() => {
    auth.id &&
      Toast.show({
        type: 'success',
        text1: `${auth.nickname ?? '회원'}님 환영합니다!`,
      });
  }, [auth.id, auth.nickname]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="post" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
