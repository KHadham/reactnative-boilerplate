import { useEffect, useState } from 'react';
import { endpoint } from '@homeApp/apis';
import Toast from 'react-native-toast-message';
import { useFetch ,handleRequest } from '@utils/networking';
interface slideInterface {
  img: string;
}

export const useHooks = () => {
  const [data, setData] = useState<slideInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // const setLoading = useGlobalLoading(state => state.setLoading);

  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    useFetch({
      endpoint: endpoint.homeSlider(),
      onSuccess: data => {
        setData(data.data);
      },
      onProgress(progress) {},
      onError: error => {
        console.log('error :>> ', error);
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      },
    });
  };

  return {
    data,
    error,
    isLoading,
  };
};
