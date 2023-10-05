import { get, handleRequest } from '@utils/networking';

interface homeApp {
  headers?: object;
}

export const endpoint = {
  homeSlider: async () =>
    handleRequest({
      method: 'get',
      path: 'beranda/v.1/Api/slider',
    }),
  homeApp: async (params: homeApp) =>
    handleRequest({
      method: 'get',
      path: 'satuakses/service/app-user',
      headers: params.headers,
    }),
};
export default { endpoint };
