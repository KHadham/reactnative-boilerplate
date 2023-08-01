import { get } from '@utils/networking';

interface endpointParam {
  page?: number;
}

export const endpoint = {
 
  pengumuman: async (params: endpointParam) =>
    get({
      path: `beranda/v.1/Api/GetBerita/pengumuman/${params.page}`,
    }),
  berita: async (params: endpointParam) =>
    get({
      path: `beranda/v.1/Api/GetBerita/berita/${params.page}`,
    }),
};
export default { endpoint };
