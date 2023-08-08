import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { navigate, replace, reset } from '@utils/navigation';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { endpoint } from '@authApp/apis';
import { useProfile } from '@profileApp/hooks/useProfile';
import { useGlobalLoading } from '@utils/state/globalLoading';
import { APPKEY } from '@constants/appKey';
import FastImage from 'react-native-fast-image';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const setLoading = useGlobalLoading(state => state.setLoading);
  const { doVerifyToken } = useProfile();

  const doLogin = async (username: string, password: string) => {
    setLoading('auth');
    Toast.show({
      type: 'loading',
      text1: 'Memproses Login ...',
      autoHide: false,
    });
    try {
      console.log('login call :>> ');
      const body = { username: username, password: password };
      const response = await endpoint.loginCitata({
        data: body,
        headers: { 'app-key': APPKEY.CITATA_KEY },
      });

      setTimeout(() => {
        if (response.status == 'success') {
          setIsLoading(false);
          storage.setItem(STORAGE_KEY.LOGIN_TOKEN, response.token);
          Toast.show({
            type: 'success',
            text1: 'Berhasil Login',
          });
          navigate({
            screen: 'Tab',
          });
          doVerifyToken();
        } else {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: response.msg,
          });
        }
      }, 1000);
    } catch (e) {
      setLoading('');
      Toast.show({
        type: 'error',
        text1: e.message,
      });
    } finally {
      Toast.hide();
      setLoading('');
    }
  };

  const doLogout = () => {
    setLoading('auth');
    Toast.show({
      type: 'loading',
      text1: 'Sedang Logout ...',
      autoHide: false,
    });
    FastImage.clearMemoryCache();
    FastImage.clearDiskCache();
    storage.removeItem(STORAGE_KEY.LOGIN_TOKEN);
    setTimeout(() => {
      setLoading('');
      Toast.show({
        type: 'success',
        text1: 'Berhasil Logout',
      });
      reset('Auth');
    }, 2000);
  };

  return {
    isLoading,
    isLoggedIn,
    error,
    doLogin,
    doLogout,
  };
};
