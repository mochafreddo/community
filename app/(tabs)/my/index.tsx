import { SafeAreaView, Text } from 'react-native';

import { router, useFocusEffect } from 'expo-router';

export default function MyScreen() {
  useFocusEffect(() => {
    router.replace('/auth');
  });

  return (
    <SafeAreaView>
      <Text>내정보스크린</Text>
    </SafeAreaView>
  );
}
