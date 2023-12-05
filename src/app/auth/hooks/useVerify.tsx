import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { endpoint } from '../apis';
import { useProfileStore } from '@profileApp/stores/storage';
import { APPKEY } from '@constants/appKey';
import { useFetch, handleRequest } from '@utils/networking';

export const useVerify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    setUserDetail,
    user,
    setEmployeeDetail,
    setPersonalDetail,
    employee,
    personal,
  } = useProfileStore();

  const action = async (token: string) => {
    useFetch({
      endpoint: endpoint.verifyTokens({
        headers: {
          'app-key': APPKEY.CITATA_KEY,
          authorization: token,
        },
      }),
      onSuccess: response => {
        console.log('verifyTokens :>> ', response.payload);
        setUserDetail(response.payload);
      },
      onProgress(progress) {
        // setIsLoading(progress);
      },
      onError: error => {
        setUserDetail(null);
        // setError(error);
      },
    });
  };

  return {
    isLoading,
    error,
    action,
    data: user,
  };
};
