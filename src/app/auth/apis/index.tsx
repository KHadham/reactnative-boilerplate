import { handleRequest } from '@utils/networking';

interface endpointParam {
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
  loginCitata: async (params: endpointParam) =>
    handleRequest({
      method: 'POST',
      path: 'satuakses/service/auth',
      data: params.data,
      headers: params.headers,
    }),

};
export default { endpoint };
