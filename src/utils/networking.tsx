import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import { storage } from '@utils/storage';
import { APPKEY } from '@constants/appKey'
import { useEffect, useState } from 'react';

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

    const realPath = path.includes('http') ? path : `${APPKEY.BASE_URL}${path}${toQueryString(query)}`
    const config: AxiosRequestConfig = {
      method,
      url: realPath,
      timeout: TIMEOUT,
    };
    if (data && Object.keys(data).length > 0) {
      config.data = data;
      console.log('ada data :>> ');
    }
    if (headers && Object.keys(headers).length > 0) {
      config.headers = headers;
      console.log('ada header :>> ')
    }
    const response = (await requestWithTimeout(config, TIMEOUT)) as AxiosResponse<any>;

    // Cache the response for future offline access
    // storage.setItem(`${method}-${path}-cache`, JSON.stringify(response.data));
    // console.log('path :>> ', path);
    // console.log('response.data :>> ', response);
    return response;
  } catch (error) {
    // console.error('Error in handleRequest:', error + ` ${path}`);
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

/**
 * Custom hook for fetching data from API. 
 * This hook is designed to work with APIs that use a token based system and respond with a status and data.
 * 
 * @param {Object} config - The configuration object for the fetching function.
 * The config object has properties `token`, `endpoint`, `successStatuses`, and `errorMessage`.
 * 
 * @returns {Object} The state of the request (data, isLoading, error):
 * - data: Response data from the request.
 * - isLoading: A boolean representing whether the request is in progress.
 * - error: Error message if the request fails, or is not successful as per successStatuses.
 *
 * Example usage:
 * 
 * const Component = () => {
 *   const { data, isLoading, error } = useFetch({
 *     token: '9998fd04-6ebb-45f8-a694-28a284e156aa',
 *     endpoint: endpoint.getFaq,
 *     successStatuses: ['success', true, 200],
 *     errorMessage: 'Error fetching data',
 *   });
 *
 * };
 */

interface FetchConfig {
  endpoint: any;
  onSuccess?: (data: any) => void;
  onError?: (e: any) => void;
  onProgress?: (e: any) => void;
  successStatuses?: (string | boolean | number)[];
}

const useFetch = async (config: FetchConfig) => {
  const {
    endpoint,
    onSuccess = () => { },
    onError = () => { },
    onProgress = () => { },
    successStatuses = ['success', true, 200],
  } = config;
  onProgress(true);
  try {
    const response = await endpoint;
    if (successStatuses.includes(response.status)) {
      onSuccess(response.data);
    } else {
      console.log(`error false on api ${endpoint} :>> `, response );
      onError(response);
    }
  } catch (e) {
    console.log(`error code on api ${endpoint} :>> `, e );
    onError(e);
  } finally {
    onProgress(false);
  }
};

export default useFetch;