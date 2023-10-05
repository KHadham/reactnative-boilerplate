import { useEffect, useState } from 'react';
import { endpoint } from '@profileApp/apis';
import { useAuth } from '@authApp/hooks/useLogin';
import Toast from 'react-native-toast-message';
import { APPKEY } from '@constants/appKey';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { useProfile } from '@profileApp/hooks/useProfile';

export const useHooks = () => {
  const { doLogout } = useAuth();
  const { data: userData } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const doChangePassword = async (password: string) => {
    setIsLoading(true);
    Toast.show({
      type: 'loading',
      text1: 'Memproses Ubah password ...',
      autoHide: false,
    });
    try {
      console.log('login call :>> ');
      const body = { id_user: userData.user.id_user, password: password };
      const response = await endpoint.changePassword({
        data: body,
        headers: {
          'app-key': APPKEY.CITATA_KEY,
          Authorization: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
      });
      setTimeout(() => {
        if (response.status == 'success' || response.status == true || response.status == 200) {
          doLogout();
          setIsLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Berhasil Ubah password',
          });
        } else {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: response.msg,
          });
        }
      }, 1000);
    } catch (e) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Terjadi error saat Login',
      });
    } finally {
      Toast.hide();
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    doChangePassword,
  };
};
