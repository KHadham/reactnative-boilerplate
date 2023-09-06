import { post, get } from '@utils/networking';

interface endpointParam {
  data?: object;
  headers?: object;
}
const jakartaWestLongitude = 106.6456;
const jakartaSouthLatitude = -6.3682;
const jakartaEastLongitude = 107.1691;
const jakartaNorthLatitude = -5.9603;

export const endpoint = {
  getMarker: async (params: endpointParam) =>
    get({
      path: `https://tataruang.jakarta.go.id/server/rest/services/Reklame/REKLAME_MASTER/FeatureServer/0/query?returnGeometry=true&where=IS_DELETE%3D0&outSr=4326&outFields=reklame_id%2CGROUP_BY_ID%2COBJECTID%2CKD_BERBAHAYA%2CKD_JENIS_TINDAKAN&inSr=4326&geometry=%7B%22xmin%22%3A106.6456%2C%22ymin%22%3A-6.3682%2C%22xmax%22%3A107.1691%2C%22ymax%22%3A-5.9603%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7D%7D&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&geometryPrecision=6&f=json`,
    }),
};
export default { endpoint };
