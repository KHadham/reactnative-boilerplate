import { STORAGE_KEY } from '@constants/index';
import { handleRequest } from '@utils/networking';
import { storage } from '@utils/storage';

interface endpointParam {
  id?: number;
  headers?: any;
  body?: object;
}

export const endpoint = {
  getMarkers: async () =>
    handleRequest({
      method: 'GET',
      path: 'https://tataruang.jakarta.go.id/server/rest/services/Reklame/REKLAME_MASTER/MapServer/0/query?returnGeometry=true&where=IS_DELETE%3D0%20AND%20(KD_WIL%3D%2771%27%20OR%20KD_WIL%3D%2772%27%20OR%20KD_WIL%3D%2773%27%20OR%20KD_WIL%3D%2774%27%20OR%20KD_WIL%3D%2775%27%20OR%20KD_WIL%3D%2776%27)&outSr=4326&outFields=*&inSr=432&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&geometryPrecision=6&f=json',
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        e_platform: 'mobile',
      },
      useSsl: true,
    }),
  getDetailMarker: async (params: endpointParam) =>
    handleRequest({
      method: 'GET',
      path: `api/semeter/reklame/${params.id}/?token_sso=${params.headers.token_sso}`,
      // data: params.headers,                ? token_sso settingan dari docker server
    }),
  getForm: async (params: endpointParam) =>
    handleRequest({
      method: 'POST',
      path: `api/semeter/user-group-privileges/?token_sso=${params.headers.token_sso}`,
      // data: params.headers,                ? token_sso settingan dari docker server
    }),
 
};
export default { endpoint };
