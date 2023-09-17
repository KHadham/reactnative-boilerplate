import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import { storage } from '@utils/storage';
import { APPKEY } from '@constants/appKey'
import { useEffect, useState } from 'react';
import { fetch } from 'react-native-ssl-pinning';

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

export const handleRequest = async ({
  method = 'GET',
  path = '',
  data = {},
  headers = {},
  query = {},
  useSsl = false
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  data?: any,
  headers?: any,
  query?: object
  useSsl?: boolean
}) => {
  try {
    const realPath = path.includes('https') ? path : `${APPKEY.BASE_URL}${path}${toQueryString(query)}`;
    const timeoutInterval = 15000; // milliseconds (customize as needed)

    const config: AxiosRequestConfig = {
      method,
      url: realPath,
      timeout: timeoutInterval,
    };
    if (Object.keys(data).length > 0) config.data = data;
    if (Object.keys(headers).length > 0) config.headers = headers;

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
          e_platform: 'mobile',
        },
      });
      const responseBody = response
      return responseBody;
    } else {
      const response = await requestWithTimeout(config, timeoutInterval);
      return response;
    }
  } catch (error) {
    console.error(`Error handle request:  ${error}`);
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

export const useFetch = async (config: FetchConfig) => {
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
    if (successStatuses?.includes(response?.status)) {
      response.data == undefined ?onSuccess(response): onSuccess(response.data);
    } else {
      onError(response);
    }
  } catch (e) {
    onError(e);
  } finally {
    onProgress(false);
  }
};

