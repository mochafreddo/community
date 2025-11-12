import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { Feather } from '@expo/vector-icons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants';

export default function ImageZoomScreen() {
  const insets = useSafeAreaInsets();

  const { uri } = useLocalSearchParams<{ uri: string }>();

  return (
    <View style={[styles.container, { marginTop: insets.top + 10 }]}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={28} color={'white'} />
      </Pressable>
      <Image
        source={{ uri }}
        resizeMode="contain"
        style={{ width: Dimensions.get('window').width, height: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
    backgroundColor: colors.BLACK,
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
