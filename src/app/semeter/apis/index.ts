import { post, get, handleRequest } from '@utils/networking';

interface endpointParam {
  data?: {
    lat: string,
    long: string,
  };
}

export const endpoint = {
  getMarker: async () =>
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
};
export default { endpoint };
