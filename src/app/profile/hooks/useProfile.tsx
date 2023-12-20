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
    user,
    setPersonalDetail,
    personal,
  } = useProfileStore();

  useEffect(() => {
    useFetch({
      endpoint: endpoint.getProfile({
        headers: {
          'app-key': APPKEY.CITATA_KEY,
          authorization: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
        query: { username: user.username },
      }),
      onSuccess: response => {
        console.log('response', response.data)
        // setEmployeeDetail(response.data.siadik);
        setPersonalDetail(response.data.sso);
      },
      onProgress(progress) {
        setIsLoading(progress);
      },
      onError: error => {
        setError(error);
      },
    });
  }, []);

  // https://dcktrp.jakarta.go.id/satuakses/app/profile/ubah_profile

  return {
    isLoading,
    error,
    dataPersonal: personal,
  };
};
