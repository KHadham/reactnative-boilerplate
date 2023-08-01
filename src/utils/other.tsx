import { useCallback } from 'react';
import { Share, Linking } from 'react-native';
import Toast from 'react-native-toast-message';

export const onShare = async ({
  title = '',
  message = '',
  url = '',
}: {
  title?: string,
  message: string,
  url?: string,
}) => {
  try {
    const result = await Share.share({
      title: title,
      message: message,
      url: url,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Terjadi kesalahan',
    });
  }
};

export const onPressLink = async ({ url }) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Toast.show({
      type: 'error',
      text1: 'Terjadi kesalahan saat membuka link',
    });
  }
};
