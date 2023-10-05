import { useState } from 'react';
import Toast from 'react-native-toast-message';
import {
  navigate,
  replace,
  reset,
  useNavigationHandler,
} from '@utils/navigation';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { endpoint } from '@authApp/apis';
import { useProfile } from '@profileApp/hooks/useProfile';
import { APPKEY } from '@constants/appKey';
import FastImage from 'react-native-fast-image';
import { useProfileStore } from '@profileApp/stores/storage';
import { useFetch, handleRequest } from '@utils/networking';

export const useAuth = () => {
  const { navigate } = useNavigationHandler();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const action = () => {
    try {
      useProfileStore.persist.clearStorage();
      Toast.show({
        type: 'loading',
        text1: 'Sedang Logout ...',
        autoHide: false,
      });
      FastImage.clearMemoryCache();
      FastImage.clearDiskCache();
      storage.removeItem(STORAGE_KEY.LOGIN_TOKEN);
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Berhasil Logout',
        });
        reset('Auth');
      }, 2000);
    } catch (error) {
      setError(error);
      Toast.show({
        type: 'error',
        text1: 'Terjadi kesalahan saat logout',
      });
    }
  };

  return {
    isLoading,
    error,
    action,
  };
};
