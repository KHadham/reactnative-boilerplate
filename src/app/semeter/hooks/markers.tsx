import { SetStateAction, useEffect, useRef, useState } from 'react';
import { endpoint } from '@semeterApp/apis';
import Toast from 'react-native-toast-message';
import { useFetch, handleRequest } from '@utils/networking';
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
} from '@semeterApp/stores/seeds';
import { STORAGE_KEY } from '@constants/index';
import { storage } from '@utils/storage';

export const useHooks = () => {
  const [data, setData] = useState<ReklameArcgisInterface>(ReklameArcgisData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mapRef = useRef(null); // Initialize the ref using useRef

  useEffect(() => {
    getMarkers();
  }, []);

  const getMarkers = async () => {
    useFetch({
      endpoint: endpoint.getMarkers(),
      onSuccess: data => {
        setData(JSON.parse(data?.bodyString));
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
    data,
    error,
    isLoading,
    ref: mapRef,
  };
};
