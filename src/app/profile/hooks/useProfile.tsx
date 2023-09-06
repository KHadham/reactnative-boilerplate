import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { endpoint } from '../apis';
import { useProfileStore } from '@profileApp/stores';
import { APPKEY } from '@constants/appKey';
import useFetch from '@utils/networking';

export const useProfile = () => {
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

  useEffect(() => {
    // fetch();
  }, []);

  const doVerifyToken = async () => {
    useFetch({
      endpoint: endpoint.verifyTokens({
        headers: {
          'app-key': APPKEY.CITATA_KEY,
          authorization: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
      }),
      onSuccess: response => {
        setUserDetail(response.payload);
        setTimeout(() => {
          fetch();
        }, 2000);
      },
      onProgress(progress) {
        setIsLoading(progress);
      },
      onError: error => {
        setError(error);
      },
    });
  };

  const fetch = async () => {
    useFetch({
      endpoint: endpoint.getProfile({
        headers: {
          'app-key': APPKEY.CITATA_KEY,
          authorization: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
        query: { username: user.username },
      }),
      onSuccess: response => {
        setEmployeeDetail(response.data.siadik);
        setPersonalDetail(response.data.sso);
      },
      onProgress(progress) {
        setIsLoading(progress);
      },
      onError: error => {
        setError(error);
      },
    });
  };

  return {
    isLoading,
    error,
    data: { user, employee, personal },
    doVerifyToken,
    fetch,
  };
};
