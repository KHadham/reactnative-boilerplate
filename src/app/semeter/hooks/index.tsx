import { useEffect, useRef, useState } from 'react';
import { endpoint } from '@semeterApp/apis';
import Toast from 'react-native-toast-message';
import useFetch from '@utils/networking';
import {
  getCurrentLocation,
  gpsEnabler,
  animateMapToTargetRegion,
} from '@utils/location';
import { useNavigationHandler } from '@utils/navigation';

interface LocationData {
  coords: {
    accuracy: number,
    altitude: number,
    heading: number,
    latitude: number,
    longitude: number,
    speed: number,
  };
  extras: {
    maxCn0: number,
    meanCn0: number,
    satellites: number,
  };
  mocked: boolean;
  timestamp: number;
}

export const useHooks = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalSetting, setModalSetting] = useState(false);
  const [modalLayer, setmodalLayer] = useState(false);
  const [layerList, setlayerList] = useState({ name: '', url: '' });
  const [isSearchingVisible, setisSearchingVisible] = useState(false);

  const { goBack } = useNavigationHandler();

  const mapRef = useRef(null); // Initialize the ref using useRef

  const [coordinate, setCoordinate] = useState({
    latitude: null,
    longitude: null,
  });

  const getDetaillocation = (location: string) => {
    // setisLoading(true);
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location}&key=AIzaSyAHAWEgBz3AN7XVrNOR9P3Rf7unJDjvH9o`,
      { method: 'GET' }
    )
      .then(response => response.json())
      .then(obj => {
        console.log('getDetaillocation :>> ', obj);
        animateMapToTargetRegion({
          ref: mapRef.current,
          latitude: obj.result.geometry.location.lat,
          longitude: obj.result.geometry.location.lng,
        });
      })
      .catch(error => {
        console.log('error :>> ', error);
        console.warn(error);
      })
      .finally(() => {});
  };

  const getLocation = () => {
    setIsLoading(true);
    getCurrentLocation({ ref: mapRef.current })
      .then(coordinate => {
        setCoordinate(coordinate);
      })
      .catch(error => {
        if (error.message == 'No location provider available.') {
          setModalSetting(true);
        }
        console.error('Error locatio:', error);
        // Handle the error here
      })
      .finally(() => setIsLoading(false));
  };

  const onConfirmGps = () => {
    gpsEnabler()
      .then(data => {
        getLocation();
      })
      .catch(err => {
        setModalSetting(true);
      });
  };

  const onCancelGps = () => {
    setModalSetting(false);
    // goBack()
  };

  useEffect(() => {
    fetch(
      // `https://tataruang.jakarta.go.id/server/rest/services/Reklame/REKLAME_MASTER/FeatureServer/0/query?returnGeometry=true?f=json`
      `https://tataruang.jakarta.go.id/server/rest/services/Reklame/REKLAME_MASTER/FeatureServer/0/query?returnGeometry=true&where=IS_DELETE%3D0%20AND%20(KD_WIL%3D%2771%27%20OR%20KD_WIL%3D%2772%27%20OR%20KD_WIL%3D%2773%27%20OR%20KD_WIL%3D%2774%27%20OR%20KD_WIL%3D%2775%27%20OR%20KD_WIL%3D%2776%27)&outSr=4326&outFields=*&inSr=4326&geometry=%7B%22xmin%22%3A106.69921875%2C%22ymin%22%3A-6.315298538330033%2C%22xmax%22%3A106.875%2C%22ymax%22%3A-6.140554782450295%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7D%7D&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&geometryPrecision=6&f=json`
      // `https://tataruang.jakarta.go.id/server/rest/services/Reklame/REKLAME_MASTER/FeatureServer/0/query?returnGeometry=true&where=IS_DELETE%3D0&outSr=4326&outFields=reklame_id%2CGROUP_BY_ID%2COBJECTID%2CKD_BERBAHAYA%2CKD_JENIS_TINDAKAN&inSr=4326&geometry=%7B%22xmin%22%3A106.6456%2C%22ymin%22%3A-6.3682%2C%22xmax%22%3A107.1691%2C%22ymax%22%3A-5.9603%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7D%7D&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&geometryPrecision=6&f=json`
    )
      .then(response => {
        console.log('response.url :>> ', response.json());
        return response.json();
      })
      .then(obj => {
        console.log('response OBJECT =====>', obj);
      })
      .catch(err => console.log('response err :>> ', err));
    getLocation();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      useFetch({
        endpoint: endpoint.getMarker({
          data: { token: '9998fd04-6ebb-45f8-a694-28a284e156aa' },
        }),
        onSuccess: data => {
          console.log('data marker :>> ', data);
          setData(data);
        },
        onProgress(progress) {
          setIsLoading(progress);
        },
        onError: error => {
          setError(error);
          Toast.show({
            text1: 'Terjadi kesalahan saat mengambil marker',
            type: 'error',
          });
        },
      });
    }, 2000);
  }, []);

  const applyLayerx = params => {
    const tempData = layerList;
    tempData.push(params);
    setlayerList(tempData);
  };

  const applyLayer = params => {
    const updatedListData = [...layerList];
    // Check if the selectedData already contains an entry with the given name
    const existingEntryIndex = updatedListData.findIndex(
      entry => entry.name === params.name
    );

    if (existingEntryIndex !== -1) {
      // If the entry exists, remove the url if it is present
      const existingUrl = updatedListData[existingEntryIndex].url;

      if (existingUrl === params.url) {
        // If the url matches the existing url, remove the entire entry
        updatedListData.splice(existingEntryIndex, 1);
      }
    } else {
      // If the entry does not exist, create a new entry
      updatedListData.push(params);
    }
    console.log('updatedListData :>> ', updatedListData);
    console.log('params :>> ', params);
    setlayerList(updatedListData);
  };

  return {
    data,
    error,
    isLoading,
    actions: {
      getLocation,
      setModalSetting,
      onConfirmGps,
      onCancelGps,
      getDetaillocation,
      setisSearchingVisible,
      setmodalLayer,
      setlayerList,
      applyLayer,
    },
    states: {
      coordinate,
      modalSetting,
      isSearchingVisible,
      modalLayer,
      layerList,
    },
    ref: mapRef,
  };
};
