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
import { useProfileStore } from '@profileApp/stores';
import { useFetch ,handleRequest } from '@utils/networking';
export const useAuth = () => {
  const { navigate } = useNavigationHandler();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { doVerifyToken, fetch } = useProfile();

  const [userName, setuserName] = useState('');
  const [errUserName, seterrUserName] = useState(null);
  const [password, setpassword] = useState('');

  const doLogin = async (username: string, password: string) => {
    const body = { username: username, password: password };
    useFetch({
      endpoint: endpoint.loginCitata({
        data: body,
        headers: { 'app-key': APPKEY.CITATA_KEY },
      }),
      onSuccess: data => {
        console.log('data login :>> ', data);
        storage.setItem(STORAGE_KEY.LOGIN_TOKEN, data.token);
        Toast.show({
          type: 'success',
          text1: 'Berhasil Login',
        });
        navigate({
          screen: 'Tab',
        });
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
        setError(error);
      },
    });

    // Toast.show({
    //   type: 'loading',
    //   text1: 'Memproses Login ...',
    //   autoHide: false,
    // });
    // try {
    //   console.log('login call :>> ');
    //   const body = { username: username, password: password };
    //   const response = await endpoint.loginCitata({
    //     data: body,
    //     headers: { 'app-key': APPKEY.CITATA_KEY },
    //   });

    //   setTimeout(() => {
    //     if (
    //       response.status == 'success' ||
    //       response.status == true ||
    //       response.status == 200
    //     ) {
    //       setIsLoading(false);
    //       console.log('response.token :>> ', response);
    //       // storage.setItem(STORAGE_KEY.LOGIN_TOKEN, response.token);
    //       Toast.show({
    //         type: 'success',
    //         text1: 'Berhasil Login',
    //       });
    //       navigate({
    //         screen: 'Tab',
    //       });
    //       doVerifyToken();
    //       fetch();
    //     } else {
    //       setIsLoading(false);
    //       Toast.show({
    //         type: 'error',
    //         text1: response.msg,
    //       });
    //     }
    //   }, 1000);
    // } catch (e) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Terjadi error saat Login',
    //   });
    // } finally {
    //   Toast.hide();
    // }
  };

  const doLogout = () => {
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
  };

  return {
    isLoading,
    error,
    doLogin,
    doLogout,
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
