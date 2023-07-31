import { PermissionsAndroid, Platform } from 'react-native';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import {
  check,
  PERMISSIONS,
  request,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

type PermissionType = 'camera' | 'storage' | 'location' | 'photo';

import * as Permissions from 'react-native-permissions';

export const requestNotification = () => {
  requestNotifications(['alert', 'sound']).then(({ status, settings }) => {
    console.log('status :>> ', status);
    console.log('settings :>> ', settings);
    // setstep(step + 1);
  });
};

export const requestCamera = () => {
  if (Platform.OS == 'android') {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      console.log('result android cam :>> ', result);
    });
  } else {
    request(PERMISSIONS.IOS.CAMERA).then(result => {
      console.log('result ios cam:>> ', result);
    });
  }
};

export const requestGallery = () => {
  if (Platform.OS == 'android') {
    request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(result => {
      console.log('result android gal :>> ', result);
    });
  } else {
    request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
      console.log('result ios gal:>> ', result);
    });
  }
};

export const requestLocation = () => {
  if (Platform.OS == 'android') {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      console.log('result android loc :>> ', result);
    });
  } else {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
      console.log('result ios loc:>> ', result);
    });
  }
};

const permissionMappings = {
  notification: {
    request: () => requestNotifications(['alert', 'sound']),
    check: () => Permissions.checkNotifications(),
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
};

export const requestPermission = ({
  type,
}: {
  type: 'notification' | 'camera' | 'gallery' | 'location' | string,
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
  type: 'notification' | 'camera' | 'gallery' | 'location' | string,
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
