import { handleRequest } from '@utils/networking';

interface homeApp {
  headers?: object;
  data?: object;
}

export const endpoint = {
  homeSlider: async () =>
    handleRequest({
      method: 'GET',
      path: 'beranda/v.1/Api/slider',
    }),
  homeApp: async (params: homeApp) =>
    handleRequest({
      method: 'GET',
      path: 'satuakses/service/app-user',
      headers: params.headers,
    }),
  galeri: async (params: homeApp) =>
    handleRequest({
      method: 'POST',
      path: 'https://dcktrp.jakarta.go.id/web-dcktrp-be/api/detail_galeri',
      data: params.data,
    }),
  albumGaleri: async (params: homeApp) =>
    handleRequest({
      method: 'POST',
      path: 'https://dcktrp.jakarta.go.id/web-dcktrp-be/api/album_galeri',
      data: params.data,
    }),
  getPermission: async (params: homeApp) =>
    handleRequest({
      method: 'GET',
      path: 'api/semeter/detail-user-group',
      data: params.data,
      headers: params.headers,
    }),
};
export default { endpoint };
