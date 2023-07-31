import { post, get } from '@utils/networking';

interface endpointParam {
  data?: object;
  headers?: object;
}

export const endpoint = {
  loginPtpn: async (params: endpointParam) =>
    post({
      path: 'auth',
      data: params.data,
    }),
  loginCitata: async (params: endpointParam) =>
    post({
      path: 'auth',
      data: params.data,
      headers: params.headers,
    }),
  verifyToken: async (params: endpointParam) =>
    get({
      path: 'auth',
      data: params.data,
      headers: params.headers,
    }),
};
export default { endpoint };
