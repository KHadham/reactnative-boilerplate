import { get, post, put, remove } from '@utils/networking';

// end point
export const endpoint = {
  login: async (params) => post('auth', params),
  // login: async () => post('auth/login'),

};
export default { endpoint };
