import type { ReactNode } from 'react';

import { router, useFocusEffect } from 'expo-router';

import { useAuth } from '@/hooks/queries/useAuth';

interface AuthRouteProps {
  children: ReactNode;
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const { auth } = useAuth();

  useFocusEffect(() => {
    !auth.id && router.replace('/auth');
  });

  return <>{children}</>;
};
