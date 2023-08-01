import { get } from '@utils/networking';

interface endpointParam {
  page?: number;
}

export const endpoint = {
  homeSlider: async () =>
    get({
      path: 'beranda/v.1/Api/slider',
    }),
 
};
export default { endpoint };
