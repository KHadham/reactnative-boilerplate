import { post, get, handleRequest } from '@utils/networking';

interface endpointParam {
  data?: object;
  headers?: object;
}

export const endpoint = {
  getFaq: async (params: endpointParam) =>
    handleRequest({
      method: 'POST',
      path: 'https://dev.dcktrp.id/web-dcktrp-be/api/faq',
      data: params.data,
    }),
  getProdukHukum: async (params: endpointParam) =>
    handleRequest({
      method: 'POST',
      path: 'https://dev.dcktrp.id/web-dcktrp-be/api/peraturan',
      data: params.data,
    }),
};
export default { endpoint };
