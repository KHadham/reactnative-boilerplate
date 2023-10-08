import { post, get, handleRequest } from '@utils/networking';

interface endpointParam {
  query?: any;
  data?: object;
  headers?: object;
}

export const endpoint = {
  verifyTokens: async (params: endpointParam) =>
    handleRequest({
      method: 'GET',
      path: 'satuakses/service/auth',
      data: params.data,
      headers: params.headers,
    }),
  getProfile: async (params: endpointParam) =>
    handleRequest({
      method: 'GET',
      path: `sso/service/user`,
      data: params.data,
      headers: params.headers,
      query: params.query,
    }),
  changePassword: async (params: endpointParam) =>
    handleRequest({
      method: 'POST',
      path: 'sso/service/user/change-password',
      data: params.data,
      headers: params.headers,
    }),
  changeProfile: async (params: endpointParam) =>
    handleRequest({
      method: 'POST',
      path: 'satuakses/app/profile/ubah_profile',
      data: params.data,
      headers: params.headers,
    }),
};
export default { endpoint };
