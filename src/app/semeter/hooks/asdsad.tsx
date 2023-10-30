import { SetStateAction, useEffect, useRef, useState } from 'react';
import { endpoint } from '@semeterApp/apis';
import Toast from 'react-native-toast-message';
import { useFetch, handleRequest } from '@utils/networking';
// import { cert1, cert2 } from '@certificate';

import {
  getCurrentLocation,
  gpsEnabler,
  animateMapToTargetRegion,
} from '@utils/location';
import { useNavigationHandler } from '@utils/navigation';
import axios from 'axios';
import { Platform } from 'react-native'; // Import the Platform module
import {
  ReklameArcgisInterface,
  BaseAtributInterface,
  ResponseAtributInterface,
} from '@semeterApp/stores/interfaces';
import {
  ReklameArcgisData,
  BaseAtributData,
  ResponseAtributData,
} from '@semeterApp/stores/seeds';
import { STORAGE_KEY } from '@constants/index';
import { storage } from '@utils/storage';

export const useHooks = () => {
  const [data, setData] = useState<ReklameArcgisInterface>(ReklameArcgisData);
  const [selectedMarker, setselectedMarker] =
    useState<BaseAtributInterface>(BaseAtributData);
  const [detailMarker, setdetailMarker] =
    useState<ResponseAtributInterface>(ResponseAtributData);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [error, setError] = useState('');
  const [modalSetting, setModalSetting] = useState(false);
  const [modalLayer, setmodalLayer] = useState(false);
  const [layerList, setlayerList] = useState({ name: '', url: '' });
  const [isSearchingVisible, setisSearchingVisible] = useState(false);

  const mapRef = useRef(null); // Initialize the ref using useRef

  const [coordinate, setCoordinate] = useState({
    latitude: null,
    longitude: null,
  });

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
      endpoint: endpoint.getMarkers(),
      onSuccess: data => {
        setData(JSON.parse(data?.bodyString));
        setTimeout(() => {
          // animateMapToTargetRegion({
          //   ref: mapRef.current,
          //   latitude: -6.1754,
          //   longitude: 106.8272,
          //   latitudeDelta: 0.5,
          //   longitudeDelta: 0.5,
          // });
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

  const getDetailMarker = async (id: number) => {
    useFetch({
      endpoint: endpoint.getDetailMarker({
        id: id,
        headers: {
          token_sso: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
      }),
      onSuccess: data => {
        console.log('data xx:>> ', data);
        setdetailMarker(data.data_reklame);
      },
      onProgress(progress) {
        setIsLoading(progress);
      },
      onError: error => {
        setdetailMarker(null);
        setError(error);
      },
    });
  };

  const applyLayer = (params: { name: any, url: any }) => {
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
    setlayerList(updatedListData);
  };

  const onPressMarker = (item: {
    attributes: BaseAtributInterface,
    geometry: { y: any, x: any },
  }) => {
    setIsModalDetail(true);
    setselectedMarker(item.attributes);
    getDetailMarker(item.attributes.REKLAME_ID);
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
      onPressMarker,
      setisSearchingVisible,
      setmodalLayer,
      setlayerList,
      applyLayer,
      getMarkers,
      setIsModalDetail,
      setselectedMarker,
    },
    states: {
      coordinate,
      modalSetting,
      isSearchingVisible,
      modalLayer,
      layerList,
      isModalDetail,
      selectedMarker,
      detailMarker,
    },
    ref: mapRef,
  };
};
