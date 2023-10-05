import { PermissionsAndroid, Platform } from 'react-native';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import {
  check,
  PERMISSIONS,
  request,
  requestNotifications,
  checkNotifications,
} from 'react-native-permissions';

const permissionMappings = {
  notification: {
    request: () => requestNotifications(['alert', 'sound']),
    check: () => checkNotifications(),
  },
  camera: {
    request: () =>
      request(
        Platform.select({
          ios: PERMISSIONS.IOS.CAMERA,
          android: PERMISSIONS.ANDROID.CAMERA,
        })
      ),
    check: () =>
      check(
        Platform.select({
          ios: PERMISSIONS.IOS.CAMERA,
          android: PERMISSIONS.ANDROID.CAMERA,
        })
      ),
  },
  gallery: {
    request: () =>
      request(
        Platform.select({
          ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
          android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        })
      ),
    check: () =>
      check(
        Platform.select({
          ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
          android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        })
      ),
  },
  location: {
    request: () =>
      request(
        Platform.select({
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        })
      ),
    check: () =>
      check(
        Platform.select({
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        })
      ),
  },
  storage: {
    request: () =>
      request(
        Platform.select({
          ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
          android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        })
      ),
    check: () =>
      check(
        Platform.select({
          ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
          android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        })
      ),
  },
};

export const requestPermission = ({
  type,
}: {
  type: 'notification' | 'camera' | 'gallery' | 'location' | 'storage' | string,
}) => {
  return new Promise((resolve, reject) => {
    console.log('type :>> ', type);
    const { request } = permissionMappings[type];
    if (!request) {
      console.log('Invalid permission type');
      reject(new Error('Invalid permission type'));
      return;
    }

    request()
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const checkPermission = ({
  type,
}: {
  type: 'notification' | 'camera' | 'gallery' | 'location' | 'storage',
}) => {
  return new Promise((resolve, reject) => {
    const { check } = permissionMappings[type];
    if (!check) {
      console.log('Invalid permission type');
      reject(new Error('Invalid permission type'));
      return;
    }

    check()
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
