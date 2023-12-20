import { useEffect, useState } from 'react';
import { endpoint } from '@semeterApp/apis';
import { useFetch } from '@utils/networking';

import { FormItemData } from '@semeterApp/stores/seeds';
import { STORAGE_KEY } from '@constants/index';
import { storage } from '@utils/storage';

export const useHooks = () => {
  const [data, setData] = useState([FormItemData]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // todo get form list
  const fetch = async () => {
    setIsLoading(true);
    useFetch({
      delay: 3000,
      endpoint: endpoint.getForm({
        headers: {
          token_sso: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
      }),
      onSuccess: data => {
        setIsLoading(false);
        setData(data?.data);
      },
      onProgress(progress) {
        progress && setIsLoading(progress);
      },
      onError: error => {
        setIsLoading(false);
        setData([]);
        setError(error);
      },
    });
  };

  return {
    data,
    error,
    isLoading,
    fetch,
  };
};
