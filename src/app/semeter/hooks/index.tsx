import { useEffect, useRef, useState } from 'react';
import { endpoint } from '@semeterApp/apis';
import Toast from 'react-native-toast-message';
import { useFetch, handleRequest } from '@utils/networking';
import { fetch } from 'react-native-ssl-pinning';
// import { cert1, cert2 } from '@certificate';

import {
  getCurrentLocation,
  gpsEnabler,
  animateMapToTargetRegion,
} from '@utils/location';
import { useNavigationHandler } from '@utils/navigation';
import axios from 'axios';
import { Platform } from 'react-native'; // Import the Platform module
import { ReklameData } from '@semeterApp/stores/interface';
import { sampleReklameData } from '@semeterApp/stores/sampleData';

export const useHooks = () => {
  const [data, setData] = useState<ReklameData>(sampleReklameData);
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
    // fetch(
    //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location}&key=AIzaSyAHAWEgBz3AN7XVrNOR9P3Rf7unJDjvH9o`,
    //   { method: 'GET' }
    // )
    //   .then(response => response.json())
    //   .then(obj => {
    //     console.log('getDetaillocation :>> ', obj);
    //     animateMapToTargetRegion({
    //       ref: mapRef.current,
    //       latitude: obj.result.geometry.location.lat,
    //       longitude: obj.result.geometry.location.lng,
    //     });
    //   })
    //   .catch(error => {
    //     console.log('error :>> ', error);
    //     console.warn(error);
    //   })
    //   .finally(() => {});
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
    getMarkers();
  }, []);

  const getMarkers = async () => {
    useFetch({
      endpoint: endpoint.getMarker(),
      onSuccess: data => {
        setData(JSON.parse(data?.bodyString));
        setTimeout(() => {
          animateMapToTargetRegion({
            ref: mapRef.current,
            latitude: -6.1754,
            longitude: 106.8272,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          });
        }, 1000);
      },
      onProgress(progress) {
        setIsLoading(progress);
      },
      onError: error => {
        setError(error);
      },
    });
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
      getMarkers,
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
