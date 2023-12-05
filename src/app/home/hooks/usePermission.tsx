import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { endpoint } from '../apis';
import { useProfileStore } from '@profileApp/stores/storage';
import { APPKEY } from '@constants/appKey';
import { useFetch, handleRequest } from '@utils/networking';

export const useHooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState(false);
  const [error, setError] = useState('');

  const action = async () => {
    useFetch({
      endpoint: endpoint.getPermission({
        headers: {
          // 'app-key': APPKEY.CITATA_KEY,
          token_sso: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
      }),
      onSuccess: response => {
        console.log('get permission :>> ', response);
      },
      onProgress(progress) {
        // setIsLoading(progress);
      },
      onError: error => {
        console.log('error permission', error)
        // setError(error);
      },
    });
  };

  return {
    isLoading,
    error,
    action,
    data,
  };
};
