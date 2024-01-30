import axios, { AxiosRequestConfig } from 'axios';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import { APPKEY } from '@constants/appKey';
import { fetch } from 'react-native-ssl-pinning';

export const checkInternetConnectivity = async (): Promise<boolean> => {
  try {
    const state: NetInfoState = await NetInfo.fetch();
    return state.isConnected ?? false;
  } catch (error) {
    return false;
  }
};

export function measureBandwitdh(
  callback: (arg0: boolean, arg1: number, arg2: null) => void
) {
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

export const networkListener = (
  callback: (isConnected: boolean) => void
): NetInfoSubscription => {
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

export const handleRequest = async ({
  method = 'GET',
  path = '',
  data = {},
  headers = {},
  query = {},
  useSsl = false,
}: // body = {},
{
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  data?: any,
  headers?: any,
  query?: object,
  useSsl?: boolean,
  // body?: Object,
}) => {
  try {
    const realPath = path.includes('https')
      ? path
      : `${APPKEY.BASE_URL}${path}${toQueryString(query)}`;
    const timeoutInterval = 15000; // milliseconds (customize as needed)

    const config: AxiosRequestConfig = {
      method,
      url: realPath,
      timeout: timeoutInterval,
    };

    if (Object.keys(data).length > 0) config.data = data;
    if (Object.keys(headers).length > 0) config.headers = headers;
    // if (Object.keys(body).length > 0) config.body = body;
    if (useSsl) {
      const response = await fetch(realPath, {
        method,
        timeoutInterval,
        sslPinning: {
          certs: [
            'DigiCert_Global_G2_TLS_RSA_SHA256_2020_CA1',
            'DigiCert_Global_Root_G2',
          ],
        },
        headers: {
          ...headers,
          Accept: 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          // e_platform: 'mobile',
        },
      });
      const responseBody = response;
      return responseBody;
    } else {
      const response = await requestWithTimeout(config, timeoutInterval);
      return response;
    }
  } catch (error) {
    console.log('error handleRequest', JSON.stringify(error, 2, null));
    console.log(
      `Error handle request:  ${`${APPKEY.BASE_URL}${path}${toQueryString(
        query
      )}`}`,
      error
    );
    throw error;
  }
};

function toQueryString(query: object) {
  if (Object.keys(query).length !== 0) {
    const queryString = Object.keys(query)
      .map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
      )
      .join('&');
    return `?${queryString}`;
  }
  return '';
}

interface FetchConfig {
  endpoint: any;
  onSuccess?: (data: any) => void;
  onError?: (e: any) => void;
  onProgress?: (e: any) => void;
  successStatuses?: (string | boolean | number)[];
  delay?: number;
}

export const useFetch = async (config: FetchConfig) => {
  const {
    endpoint,
    onSuccess = () => {},
    onError = () => {},
    onProgress = () => {},
    successStatuses = [
      'success',
      true,
      200,
      201,
      202,
      203,
      204,
      205,
      206,
      207,
      208,
      226,
    ],
    delay = 0,
  } = config;
  onProgress(true);
  try {
    const response = await endpoint;

    setTimeout(() => {
      if (successStatuses?.includes(response?.status)) {
        response.data == undefined
          ? onSuccess(response)
          : onSuccess(response.data);
      } else {
        onError(response);
      }
      onProgress(false);
    }, delay);
  } catch (e) {
    onError(e);
    onProgress(false);
  }
};
