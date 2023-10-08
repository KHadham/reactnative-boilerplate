import { SetStateAction, useEffect, useRef, useState } from 'react';
import { endpoint } from '@semeterApp/apis';
import Toast from 'react-native-toast-message';
import { useFetch, handleRequest } from '@utils/networking';
import { fetch } from 'react-native-ssl-pinning';
// import { cert1, cert2 } from '@certificate';

import {
  getCurrentLocation,
  gpsEnabler,
  animateMapToTargetRegion,
} from '@utils/location';
import { useNavigationHandler } from '@utils/navigation';
import axios from 'axios';
import { Platform } from 'react-native'; // Import the Platform module
import {
  ReklameArcgisInterface,
  BaseAtributInterface,
  ResponseAtributInterface,
} from '@semeterApp/stores/interfaces';
import {
  ReklameArcgisData,
  BaseAtributData,
  ResponseAtributData,
  FormItemData,
} from '@semeterApp/stores/seeds';
import { STORAGE_KEY } from '@constants/index';
import { storage } from '@utils/storage';

export const useHooks = () => {
  const [data, setData] = useState([FormItemData]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch();
  }, []);
  
  // todo get form list
  const fetch = async () => {
    useFetch({
      endpoint: endpoint.getForm({
        headers: {
          token_sso: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
      }),
      onSuccess: data => {
        setData(data?.data);
        console.log('data form hook:>> ', data.data[0]);
      },
      onProgress(progress) {
        setIsLoading(progress);
      },
      onError: error => {
        setData([]);
        setError(error);
      },
    });
  };

  return {
    data,
    error,
    isLoading,
  };
};
