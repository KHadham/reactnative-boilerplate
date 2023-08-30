import { get } from '@utils/networking';

interface homeApp {
  headers?: object;
}

export const endpoint = {
  homeSlider: async () =>
    get({
      path: 'beranda/v.1/Api/slider',
    }),
  homeApp: async (params: homeApp) =>
    get({
      path: 'satuakses/service/app-user',
      headers: params.headers,
    }),
};
export default { endpoint };
