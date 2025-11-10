import { Pressable, StyleSheet, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { Ionicons } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants';
import { useUploadImages } from '@/hooks/queries/useUploadImages';
import { getFormDataImages } from '@/utils/images';

export const PostWriteFooter = () => {
  const uploadImages = useUploadImages();

  const handleOpenImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: true,
    });

    if (result.canceled) return;

    const formData = getFormDataImages('images', result.assets);
    uploadImages.mutate(formData, {
      onSuccess: (data: string[]) => console.log('data', data),
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable style={styles.footerIcon} onPress={handleOpenImagePicker}>
          <Ionicons name={'camera'} size={20} color={colors.BLACK} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 12,
    bottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_300,
    flexDirection: 'row',
    gap: 10,
  },
  footerIcon: {
    backgroundColor: colors.GRAY_100,
    padding: 10,
    borderRadius: 5,
  },
});
