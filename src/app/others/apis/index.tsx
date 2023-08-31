import { post, get } from '@utils/networking';

interface endpointParam {
  data?: object;
  headers?: object;
}

export const endpoint = {
  getFaq: async (params: endpointParam) =>
    post({
      path: 'https://dev.dcktrp.id/web-dcktrp-be/api/faq',
      data: params.data,
    }),
 
};
export default { endpoint };
