import { Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthRoute } from '@/components/AuthRoute';

export default function MyScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>내정보스크린</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
