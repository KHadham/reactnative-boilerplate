import { post, get ,handleRequest } from '@utils/networking';

interface endpointParam {
  data?: object;
  headers?: object;
}

export const endpoint = {
  getFaq: async (params: endpointParam) =>
    handleRequest({ method: 'post',
      path: 'https://dev.dcktrp.id/web-dcktrp-be/api/faq',
      data: params.data,
    }),
 
};
export default { endpoint };
