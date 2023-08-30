import { useEffect, useState } from 'react';
import { endpoint } from '@homeApp/apis';
import Toast from 'react-native-toast-message';
import { useProfileStore } from '@homeApp/stores';
import { APPKEY } from '@constants/appKey';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';

export const useHooks = () => {
  const { apps, setApp } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await endpoint.homeApp({
          headers: {
            'app-key': APPKEY.CITATA_KEY,
            authorization: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
          },
        });
        if (response.status == 'success' ||  response.status == true) {
          setApp(response.app_list);
        } else {
          Toast.show({
            type: 'error',
            text1: response.message,
          });
          setError(response.message);
        }
      } catch (e) {
        console.log('e eee :>> ', e);
        Toast.show({
          type: 'error',
          text1: 'Terjadi kesalahan saat mengambil data',
        });
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return {
    data: apps,
    error,
    isLoading,
    fetching,
  };
};
