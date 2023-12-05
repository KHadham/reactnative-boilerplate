import { useEffect, useState } from 'react';
import { endpoint } from '@homeApp/apis';
import Toast from 'react-native-toast-message';
import { useProfileStore } from '@homeApp/stores';
import { APPKEY } from '@constants/appKey';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { useFetch ,handleRequest } from '@utils/networking';

export const useHooks = () => {
  const { apps, setApp } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    useFetch({
      endpoint: endpoint.homeApp({
        headers: {
          'app-key': APPKEY.CITATA_KEY,
          authorization: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
      }),
      onSuccess: data => {
        setApp(data.app_list);
      },
      onProgress(progress) {
        
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      },
    });
  };

  return {
    data: apps,
    error,
    isLoading,
    fetching,
  };
};
