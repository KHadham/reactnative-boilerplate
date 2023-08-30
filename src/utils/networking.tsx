import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import { storage } from '@utils/storage';
import { APPKEY } from '@constants/appKey'
// import {useGlobalLoading} from './state/globalLoading'; 
const TIMEOUT = 15000;

export const checkInternetConnectivity = async (): Promise<boolean> => {
  try {
    const state: NetInfoState = await NetInfo.fetch();
    return state.isConnected ?? false;
  } catch (error) {
    return false;
  }
};

export function measureBandwitdh(callback: (arg0: boolean, arg1: number, arg2: null) => void) {
  const startTime = new Date().getTime();
  const imageUri =
    'http://chandra.harvard.edu/graphics/resources/desktops/2006/1e0657_1280.jpg';
  axios
    .get(imageUri, {
      responseType: 'arraybuffer',
    })
    .then(response => {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000;
      const dataArray = new Uint8Array(response.data);
      const speed = (dataArray.length * 8) / (1024 * 1024 * duration);
      callback(true, speed, null);
    })
    .catch(err => {
      callback(false, null, err);
    });
}

export const networkListener = (callback: (isConnected: boolean) => void): NetInfoSubscription => {
  return NetInfo.addEventListener((state: NetInfoState) => {
    callback(state.isConnected ?? false);
  });
};

const requestWithTimeout = async (
  config: AxiosRequestConfig,
  timeout: number
) => {
  return Promise.race([
    axios(config),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    ),
  ]);
};

const handleRequest = async (
  method: string,
  path: string,
  data: any,
  headers: any,
  query: object
) => {
  try {
    // const setLoading = useGlobalLoading((state) => state.setLoading);
    // setLoading(true); 

    const isConnected = await checkInternetConnectivity(); // Implement your own function to check for internet connectivity
    if (!isConnected) {
      if (method === 'POST') {
        // Cache the POST data for later resend
        // storage.setItem(`${method}-${path}-cached`, JSON.stringify(data));
        Toast.show({
          type: 'warning',
          text1: 'Tidak ada koneksi,data tersimpan sementara !',
        });
      } else {
        const cachedResponse = storage.getItem(`${method}-${path}-cache`);
        if (cachedResponse) {
          return cachedResponse
        } else {
          Toast.show({
            type: 'error',
            text1: 'Tidak ada koneksi !',
          });
        }
      }
    }

    const config: AxiosRequestConfig = {
      method,
      url: `${APPKEY.BASE_URL}${path}${toQueryString(query)}`,
      timeout: TIMEOUT,
    };
    if (data && Object.keys(data).length > 0) {
      config.data = data;
    }
    if (headers && Object.keys(headers).length > 0) {
      config.headers = headers;
    }
    const response = (await requestWithTimeout(config, TIMEOUT)) as AxiosResponse<any>;

    // Cache the response for future offline access
    // storage.setItem(`${method}-${path}-cache`, JSON.stringify(response.data));
    console.log('path :>> ', path);
    console.log('response.data :>> ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in handleRequest:', error + ` ${path}`);
    console.error('Error in message:', error.message);
    throw error;
  }
};

function toQueryString(query: object) {
  if (Object.keys(query).length !== 0) {
    const queryString = Object.keys(query)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&');
    return `?${queryString}`;
  }
  return ''
}

export const get = async ({
  path = '',
  data = {},
  headers = {},
  query = {}
}: {
  path: string,
  data?: object,
  headers?: object,
  query?: object
}) => handleRequest('get', path, data, headers, query);

export const post = async ({
  path = '',
  data = {},
  headers = {},
  query = {}
}: {
  path: string,
  data?: object,
  headers?: object,
  query?: object
}) => handleRequest('post', path, data, headers, query,);

export const put = async ({
  path = '',
  data = {},
  headers = {},
  query = {}
}: {
  path: string,
  data?: object,
  headers?: object,
  query?: object
}) => handleRequest('put', path, data, headers, query);

export const remove = async ({
  path = '',
  data = {},
  headers = {},
  query = {}
}: {
  path: string,
  data?: object,
  headers?: object,
  query?: object
}) => handleRequest('delete', path, data, headers, query);
