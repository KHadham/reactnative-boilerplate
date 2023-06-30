import { PermissionsAndroid, Platform } from 'react-native';
import ImagePicker, { Image } from 'react-native-image-crop-picker';

type PermissionType = 'camera' | 'storage' | 'location'|'photo';

import * as Permissions from 'react-native-permissions';


export async function requestPermission(permissionType: PermissionType): Promise<boolean> {
  if (Platform.OS === 'android') {
    // For Android, we use the PermissionsAndroid API
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS[permissionType],
        {
          title: `Permission to access ${permissionType}`,
          message: `We need your permission to access your ${permissionType} so that you can use this feature.`,
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.warn(`Error requesting ${permissionType} permission: ${error}`);
      return false;
    }
  } else {
    // For iOS and newer Android versions, we use the react-native-permissions API
    const permissionStatus = await Permissions.request(permissionType);
    return permissionStatus === 'granted';
  }
}

export async function openImagePicker(): Promise<Image> {
    const cameraPermissionGranted = await requestPermission('camera');
    const photoPermissionGranted = await requestPermission('photo');
  
    if (cameraPermissionGranted && photoPermissionGranted) {
      try {
        const image = await ImagePicker.openPicker({
          mediaType: 'photo',
          multiple: false,
        }) as Image;
  
        if (!image) {
          throw new Error('Invalid image');
        }
  
        return image;
      } catch (error) {
        console.warn(`Error selecting image: ${error}`);
        throw error;
      }
    } else {
      throw new Error('Permissions not granted');
    }
  }
  