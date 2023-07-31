import { post, get } from '@utils/networking';

interface endpointParam {
  data?: object;
  headers?: object;
}

export const endpoint = {
  verifyTokens: async (params: endpointParam) =>
    get({
      path: 'auth',
      data: params.data,
      headers: params.headers,
    }),
};
export default { endpoint };
