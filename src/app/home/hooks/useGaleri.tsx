import { useEffect, useState } from 'react';
import { endpoint } from '@newsApp/apis';
import Toast from 'react-native-toast-message';
import { useFetch, handleRequest } from '@utils/networking';
import { APPKEY } from '@constants/appKey';

export const useHooks = () => {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = () => {
    setData([]);
    useFetch({
      endpoint: endpoint.galeri({
        data: { token: APPKEY.CUSTOM_TOKEN },
      }),
      onSuccess: data => {
        console.log('data galeri :>> ', data);
        setData(data.data);
      },
      onProgress(progress) {
        setIsLoading(progress);
      },
      onError: error => {
        console.log('error  galeri:>> ', error);
        setData([]);
        setError(error);
      },
    });
  };

  useEffect(() => {
    fetching();
  }, []);

  return {
    data,
    error,
    isLoading,
    fetching,
  };
};
