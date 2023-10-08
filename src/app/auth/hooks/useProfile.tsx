import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { endpoint } from '../apis';
import { useProfileStore } from '@profileApp/stores/storage';
import { APPKEY } from '@constants/appKey';
import { useFetch, handleRequest } from '@utils/networking';
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

  const action = async () => {
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
    user,
    employee,
    personal,
    action,
  };
};
