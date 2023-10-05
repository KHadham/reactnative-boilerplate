import { post, get ,handleRequest } from '@utils/networking';

interface endpointParam {
  query?: any;
  data?: object;
  headers?: object;
}

export const endpoint = {
  verifyTokens: async (params: endpointParam) =>
    handleRequest({ method: 'get',
      path: 'satuakses/service/auth',
      data: params.data,
      headers: params.headers,
    }),
  getProfile: async (params: endpointParam) =>
    handleRequest({ method: 'get',
      path: `sso/service/user`,
      data: params.data,
      headers: params.headers,
      query: params.query,
    }),
  changePassword: async (params: endpointParam) =>
    handleRequest({ method: 'post',
      path: 'sso/service/user/change-password',
      data: params.data,
      headers: params.headers,
    }),
};
export default { endpoint };
