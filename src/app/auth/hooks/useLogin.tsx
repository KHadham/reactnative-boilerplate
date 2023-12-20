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
import { useVerify } from './useVerify';
const hooks = () => {
  const { navigate } = useNavigationHandler();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { action: verify } = useVerify();

  const [userName, setuserName] = useState('');
  const [errUserName, seterrUserName] = useState(null);
  const [password, setpassword] = useState('');

  const action = async (body: { username: string, password: string }) => {
    console.log('body', body)
    useFetch({
      endpoint: endpoint.loginCitata({
        data: body,
        headers: { 'app-key': APPKEY.CITATA_KEY },
      }),
      onSuccess: data => {
        console.log('body :>> ', body);
        console.log('data login :>> ', data);
        storage.setItem(STORAGE_KEY.LOGIN_TOKEN, data.token);
        verify(data.token);
        setTimeout(() => {
          Toast.show({
            type: 'success',
            text1: 'Berhasil Login',
          });
          navigate({
            screen: 'Tab',
          });
        }, 1000);
      },
      onProgress(progress) {
        progress &&
          Toast.show({
            type: 'loading',
            text1: 'Memproses Login ...',
            autoHide: false,
          });
      },
      onError: error => {
        console.log('error :>> ', error);
        Toast.show({
          type: 'error',
          text1: 'Terjadi kesalahaan saat login',
        });
        setError(error);
      },
    });
  };

  return {
    isLoading,
    error,
    action,
    state: {
      userName,
      errUserName,
      password,
    },
    setState: {
      setuserName,
      seterrUserName,
      setpassword,
    },
  };
};
export default hooks;
