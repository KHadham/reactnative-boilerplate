import { post, get ,handleRequest } from '@utils/networking';

interface endpointParam {
  data?: object;
  headers?: object;
}

export const endpoint = {
  loginPtpn: async (params: endpointParam) =>
    handleRequest({ method: 'post',
      path: 'satuakses/service/auth',
      data: params.data,
    }),
  loginCitata: async (params: endpointParam) =>
    handleRequest({ method: 'post',
      path: 'satuakses/service/auth',
      data: params.data,
      headers: params.headers,
    }),
 
};
export default { endpoint };
