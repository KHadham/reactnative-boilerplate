import { STORAGE_KEY } from '@constants/index';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@utils/storage';
import DeviceInfo from 'react-native-device-info';
import { Linking } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

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
  animate = true,
  ref,
}: {
  animate?: boolean,
  ref: any,
}) => {
  return new Promise<{ latitude: number, longitude: number }>(
    (resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          console.log('position xxx :>> ', position);
          const { latitude, longitude } = position.coords;

          const targetRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          console.log('targetRegion :>> ', targetRegion);
          if (animate) animateMapToTargetRegion({ ref, latitude, longitude });

          // Resolve the Promise with latitude and longitude
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
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 60000 }
      );
    }
  );
};

export const animateMapToTargetRegion = ({
  ref,
  latitude,
  longitude,
}: {
  ref: any,
  latitude: any,
  longitude: any,
}) => {
  const targetRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  ref.animateToRegion(targetRegion, 1000);
};
