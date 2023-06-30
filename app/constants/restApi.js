import { get, post, put, remove } from '@app/helper/networking';

// end point
export const endpoint = {
  login: async (params) => post('auth/login', params),
  // login: async () => post('auth/login'),

};
export default { endpoint };
