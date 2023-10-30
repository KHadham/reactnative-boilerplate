import { useEffect, useState } from 'react';
import { endpoint } from '@othersApp/apis';
import Toast from 'react-native-toast-message';
import { useFetch, handleRequest } from '@utils/networking';
import { ProdukHukumInterface } from '@othersApp/stores/interfaces';
import { ProdukHukumData } from '@othersApp/stores/seeds';
import { APPKEY } from '@constants/appKey';

export const useHooks = () => {
  const [data, setData] = useState<ProdukHukumInterface[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setData([ProdukHukumData, ProdukHukumData]);
    useFetch({
      endpoint: endpoint.getProdukHukum({
        data: { token: APPKEY.CUSTOM_TOKEN },
      }),
      onSuccess: data => {
        console.log('data hukum :>> ', data);
        setData(data.data);
      },
      onProgress(progress) {
        setIsLoading(progress);
      },
      onError: error => {
        console.log('error  faq:>> ', error);
        setData([]);
        setError(error);
      },
      delay: 2000,
    });
  }, []);

  return {
    data,
    error,
    isLoading,
  };
};
