import { STORAGE_KEY } from '@constants/index';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@utils/storage';
import DeviceInfo from 'react-native-device-info';
import { Linking } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export const gpsEnabler = () => {
  return new Promise<string>((resolve, reject) => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
        // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        //  - ERR03 : Internal error
      });
  });
};

export const isGpsEnabled = () => {
  DeviceInfo.isLocationEnabledSync();
};

export const getCurrentLocation = async ({
  navigate = false,
  ref,
}: {
  navigate?: boolean,
  ref?: any,
}) => {
  return new Promise<{ latitude: number, longitude: number }>(
    (resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          const targetRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          if (navigate && ref) {
            animateMapToTargetRegion({ ref, latitude, longitude });
          }

          // Resolve the Promise with latitude and longitudes
          resolve({ latitude, longitude });
        },
        error => {
          Toast.show({
            text1: 'Terjadi kesalahan saat mengambil lokasi',
            type: 'error',
          });
          // Reject the Promise with the error
          reject(error);
        },
        // cache bug
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    }
  );
};

export const animateMapToTargetRegion = ({
  ref,
  latitude,
  longitude,
  latitudeDelta = 0.01,
  longitudeDelta = 0.01,
  onAnimationComplete,
  timing = 1000,
}: {
  ref: any,
  latitude: any,
  longitude: any,
  latitudeDelta?: any,
  longitudeDelta?: any,
  onAnimationComplete?: () => void,
  timing?: number,
}) => {
  const targetRegion = {
    latitude,
    longitude,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  };
  ref.animateToRegion(targetRegion, timing);

  // If a callback for animation completion is provided, call it after the animation duration
  if (onAnimationComplete) {
    setTimeout(onAnimationComplete, timing / 2);
  }
};
