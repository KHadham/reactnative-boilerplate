import {
  check,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
  request,
  requestMultiple,
} from 'react-native-permissions';
import { Platform } from 'react-native';

export const checkPermission = (permissionKey: any) => {
  const permissionAccess = [
    {
      permissionName: 'camera',
      permissionCode: {
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      },
    },
    {
      permissionName: 'gallery',
      permissionCode: {
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      },
    },
    {
      permissionName: 'location',
      permissionCode: {
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      },
    },
    {
      permissionName: 'bluetooth',
      permissionCode: {
        ios: PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
        android: PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      },
    },
    {
      permissionName: 'bluetooth',
      permissionCode: {
        ios: PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
        android: PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      },
    },
  ].find(data => data.permissionName == permissionKey).permissionCode[
    Platform.OS
  ];

  return new Promise((resolve, reject) => {
    // const permissionAccess = permissionList.find(
    //   data => data.permissionName == permissionKey
    // ).permissionCode[Platform.OS]; 

    check(permissionAccess)
      .then(async result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            reject(new Error('This feature is not available'));
            break;
          case RESULTS.DENIED:
            await requestPermission(permissionAccess);
            break;
          case RESULTS.LIMITED:
            reject(
              new Error('The permission is limited: some actions are possible')
            );
            break;
          case RESULTS.GRANTED:
            resolve(true);
            break;
          case RESULTS.BLOCKED:
            reject(
              new Error('The permission is denied and not requestable anymore')
            );
            break;
        }
      })
      .catch(error => {
        reject(new Error(error));
      });
  });
};

export const requestPermission = (permissionAccess: any) => {
  return new Promise((resolve, reject) => {
    request(permissionAccess)
      .then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            resolve(true);
            break;
          case RESULTS.BLOCKED:
            reject(
              new Error('check The permission is denied and not requestable')
            );
            break;
        }
      })
      .catch(error => {
        return error;
      });
  });
};

// basic usage
// checkPermission('camera')
// .then(data => {
//   if (data) {
//       doPermission()
//   } else {
//       console.log('error permissionHandler:>> ')
//   }
// })
// .catch(error => console.log('error permissionHandler:>> ', error));
