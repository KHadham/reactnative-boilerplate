import { handleRequest } from '@utils/networking';

interface endpointParam {
  page?: number;
  data?: object;
}

export const endpoint = {
  pengumuman: async (params: endpointParam) =>
    handleRequest({
      method: 'GET',
      path: `beranda/v.1/Api/GetBerita/pengumuman/${params.page}`,
    }),
  berita: async (params: endpointParam) =>
    handleRequest({
      method: 'GET',
      path: `beranda/v.1/Api/GetBerita/berita/${params.page}`,
    }),
  galeri: async (params: endpointParam) =>
    handleRequest({
      method: 'POST',
      path: 'https://dcktrp.jakarta.go.id/web-dcktrp-be/api/detail_galeri',
      data: params.data,
    }),
  albumGaleri: async (params: endpointParam) =>
    handleRequest({
      method: 'POST',
      path: 'https://dcktrp.jakarta.go.id/web-dcktrp-be/api/album_galeri',
      data: params.data,
    }),
};
export default { endpoint };
