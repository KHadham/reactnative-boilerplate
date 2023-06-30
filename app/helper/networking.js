// /* global fetch:true */
// import { API_URL, CHAT_URL } from 'react-native-dotenv';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cacheService from './cache';
import { STORAGE_KEY } from '@app/constants';

export const config = {
  baseUrl: 'https://dummyjson.com/',
  // chatUrl: CHAT_URL
};
export const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  NO_CONTENT: 204,
};

const fetchData = async (url, params, customHeaders, cachedControll) => {
  const loginToken = await AsyncStorage.getItem(STORAGE_KEY.LOGIN_TOKEN);
  // console.log('url', url);
  // setTimeout(() => {
  //   console.log('url ===>', url);
  //   console.log('loginToken', loginToken);
  // }, 2000);

  const source = axios.CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
  }, 15000);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization:'',
    //  Authorization: `Bearer ${ await AsyncStorage.getItem('token')}`,
    ...customHeaders,
  };

  const response = await axios({
    timeout: 15000,
    url,
    ...params,
    headers,
    cancelToken: source.token,
  })
    .then(result => {
      // for DELETE method case
      if (result.status === STATUS_CODE.NO_CONTENT) {
        clearTimeout(timeout);
        return {};
      }
      // // for caching response API
      if (cachedControll) {
        clearTimeout(timeout);
        cacheService.set(cachedControll, result.data);
      }
      clearTimeout(timeout);
      return result.data;
    })
    .catch(result => {
      console.log('params :>> ', params);
      console.log('result network :>> ', result);
      clearTimeout(timeout);
      const errMessage = result?.message?.split(' ');

      if (axios.isCancel(result)) {
        return 'timeout';
      }
      if (result.toJSON().message === 'Network Error') {
        return 'timeout';
      }
      if (errMessage[0] === 'timeout') {
        return 'timeout';
      }
      return result.response.data;
    });
  return response;
};

const get = async (
  endpoint,
  params = {},
  cachedControll = {},
  headers = {},
  chat
) => {
  const { cached = false, update = false, name } = cachedControll;
  let queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  if (queryString.length > 0) {
    queryString = `?${queryString}`;
  }
  let url = `${config.baseUrl}${endpoint}${queryString}`;

  const fetchParams = {
    method: 'GET',
  };

  if (!update && cached && name) {
    const result = await cacheService.get(name);
    if (result) {
      return result;
    }
  }
  return fetchData(url, fetchParams, headers, cachedControll);
};

const post = async (endpoint, params = {}, headers = {}, type) => {
  let url;
  let fetchParams;
  url = `${config.baseUrl}${endpoint}`;
  fetchParams = {
    method: 'POST',
    data: params,
  };
  return fetchData(url, fetchParams, headers);
};

const patch = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'PATCH',
    data: params,
  };
  return fetchData(url, fetchParams, headers);
};

const put = async (endpoint, params = {}, headers = {}, type) => {
  let url;
  let fetchParams;
  if (type === 'formData') {
    url = `${config.baseUrl}${endpoint}`;
    fetchParams = {
      method: 'PUT',
      data: params,
    };
  } else {
    url = `${config.baseUrl}${endpoint}`;
    fetchParams = {
      method: 'PUT',
      data: params,
    };
  }
  return fetchData(url, fetchParams, headers);
};

const remove = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'DELETE',
    data: params,
  };
  return fetchData(url, fetchParams, headers);
};

export { get, post, put, patch, remove };
