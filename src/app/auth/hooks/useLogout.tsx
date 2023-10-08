import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { reset } from '@utils/navigation';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import FastImage from 'react-native-fast-image';
import { useProfileStore } from '@profileApp/stores/storage';

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const action = () => {
    setIsLoading(true);
    Toast.show({
      type: 'loading',
      text1: 'Sedang Logout ...',
      autoHide: false,
    });
    try {
      useProfileStore.persist.clearStorage();
      FastImage.clearMemoryCache();
      FastImage.clearDiskCache();
      storage.removeItem(STORAGE_KEY.LOGIN_TOKEN);
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Berhasil Logout',
          visibilityTime: 1000,
        });
        reset('Auth');
      }, 2000);
    } catch (error) {
      setError(error);
      Toast.show({
        type: 'error',
        text1: 'Terjadi kesalahan saat logout',
        visibilityTime: 1000,
      });
    }
  };

  return {
    isLoading,
    error,
    action,
  };
};
