import { useEffect, useState } from 'react';
import { endpoint } from '@semeterApp/apis';
import { useFetch } from '@utils/networking';

import { ResponseDetailMarkerInterface } from '@semeterApp/stores/interfaces';
import { ResponseDetailMarker } from '@semeterApp/stores/seeds';
import { STORAGE_KEY } from '@constants/index';
import { storage } from '@utils/storage';

export const useHooks = () => {
  const [detailMarker, setdetailMarker] =
    useState<ResponseDetailMarkerInterface>(ResponseDetailMarker);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getDetailMarker = async (id: number) => {
    useFetch({
      endpoint: endpoint.getDetailMarker({
        id: id,
        headers: {
          token_sso: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
      }),
      onSuccess: data => {
        console.log('datareklame', data);
        setdetailMarker(data);
      },
      onProgress(progress) {
        setIsLoading(progress);
      },
      onError: error => {
        setdetailMarker(null);
        setError(error);
      },
    });
  };

  useEffect(() => {}, [detailMarker]);

  return {
    error,
    isLoading,
    data: detailMarker,
    actions: getDetailMarker,
  };
};
