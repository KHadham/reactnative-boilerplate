import { post, get } from '@utils/networking';

interface endpointParam {
  query?: any;
  data?: object;
  headers?: object;
}

export const endpoint = {
  verifyTokens: async (params: endpointParam) =>
    get({
      path: 'satuakses/service/auth',
      data: params.data,
      headers: params.headers,
    }),
  getProfile: async (params: endpointParam) =>
    get({
      path: `sso/service/user`,
      data: params.data,
      headers: params.headers,
      query: params.query,
    }),
};
export default { endpoint };
