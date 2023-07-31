import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { navigate, replace, reset } from '@utils/navigation';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { endpoint } from '../apis';
import profilStore from '@profileApp/stores';
import { useGlobalLoading } from '@utils/state/globalLoading';
import { APPKEY } from '@constants/appKey';

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const setLoading = useGlobalLoading(state => state.setLoading);
  const { setUser } = profilStore();

  const doVerifyToken = async () => {
    setLoading('auth');
    Toast.show({
      type: 'loading',
      text1: 'Verify Login ...',
      autoHide: false,
    });
    try {
      const response = await endpoint.verifyTokens({
        headers: {
          'app-key': APPKEY.CITATA_KEY,
          authorization: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
      });
      if (response.status === 'success') {
        console.log('setuser data :>> ', response.payload);
        setUser(response.payload);
      } 
      console.log('response verify:>> ', response);
    } catch (e) {
      console.log('error verify:>> ', e);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: e.message,
      });
    } finally {
      Toast.hide();
      setLoading('');
    }
  };

  return {
    isLoading,
    error,
    doVerifyToken,
  };
};
