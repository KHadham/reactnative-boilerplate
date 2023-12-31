import { useEffect, useState } from 'react';
import { endpoint } from '@othersApp/apis';
import Toast from 'react-native-toast-message';
import { useFetch, handleRequest } from '@utils/networking';
import { FAQInterface } from '@othersApp/stores/interfaces';
import { FAQData } from '@othersApp/stores/seeds';
import { APPKEY } from '@constants/appKey';
export const useHooks = () => {
  const [data, setData] = useState<FAQInterface[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = () => {
    setData([FAQData, FAQData]);
    useFetch({
      endpoint: endpoint.getFaq({
        data: { token: APPKEY.CUSTOM_TOKEN },
      }),
      onSuccess: data => {
        console.log('data faq :>> ', data);
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
