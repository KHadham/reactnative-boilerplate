import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { BaseView, Header, HeaderModal, Icon, ModalBasic } from '@components';
import {} from '@components';
import Modal from 'react-native-modal';
import { spacing } from '@constants/spacing';
import {
  COLOR_BASE_PRIMARY_DARK,
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_GREY,
} from '@themes/index';
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { requestPermission } from '@utils/permissions';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { widthByScreen } from '@utils/dimensions';

interface AppProps {
  isVisible: boolean;
  onClose: Function;
  url: any;
  title: any;
}

const App: React.FC<AppProps> = ({
  isVisible = false,
  onClose,
  url,
  title,
}) => {
  const [isLoading, setisLoading] = useState(false);

  const downloadAndroid = () => {
    setisLoading(true);
    console.log('url :>> ', url);
    ReactNativeBlobUtil.config({
      fileCache: true,
    })
      .fetch('GET', url)
      .then(async res => {
        await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
          {
            name: title,
            parentFolder: 'DCKTRP',
            mimeType: 'application/pdf',
          },
          'Download',
          res.path()
        );
        Toast.show({
          type: 'success',
          text1: `Berhasil simpan PDF`,
          text2: 'cek file pada bagian Download',
        });
        setisLoading(false);
      })
      .catch(err => {
        console.log('err pdf download :>> ', err);
        setisLoading(false);
        Toast.show({
          type: 'error',
          text1: `Terjadi kesalahan saat download PDF`,
        });
      });
  };

  const downloadForIOS = () => {
    setisLoading(true);
    const path = ReactNativeBlobUtil.fs.dirs.DocumentDir + '/' + title + '.pdf';
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
      path,
    })
      .fetch('GET', url)
      .then(async res => {
        console.log('res :>> ', res);
        setisLoading(false);
        ReactNativeBlobUtil.ios.previewDocument(res.path());
        Toast.show({
          type: 'success',
          text1: `Berhasil simpan PDF`,
          text2: 'cek file pada bagian Download',
        });
      })
      .catch(err => {
        console.log('err pdf download :>> ', err);
        setisLoading(false);
        Toast.show({
          type: 'error',
          text1: `Terjadi kesalahan saat download PDF`,
        });
      });
  };

  const downloadWraper = async ({ url, filename }) => {
    let response;
    const newFilename = `${filename}-${Date.now()}`;
    if (!url || typeof url !== 'string') {
      Toast.show({
        type: 'error',
        text1: `URL Tidak di support`,
      });
    }

    try {
      if (Platform.OS === 'ios') {
        response = await downloadForIOSx({ filename, url });
      } else {
        response = await downloadForAndroid({ filename, url });
      }

      Toast.show({
        type: 'success',
        text1: `Berhasil simpan PDF`,
        text2: 'cek file pada bagian Download',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Terjadi kesalahan saat download PDF`,
      });
      console.log('errorpdf', error);
    } finally {
      if (response?.flush) {
        // response.flush();
      }
    }
  };

  const downloadForAndroid = async ({ filename, url }) => {
    const result = await requestPermission({ type: 'storage' });
    if (result !== 'GRANTED') {
      throw new Error(result);
    }

    const response = await ReactNativeBlobUtil.config({
      fileCache: true,
    }).fetch('GET', url);

    const newPath = await ReactNativeBlobUtil.MediaCollection.createMediafile(
      {
        name: `${filename}.pdf`,
        parentFolder: '',
        mimeType: 'application/pdf',
      },
      'Download'
    );

    await ReactNativeBlobUtil.MediaCollection.writeToMediafile(
      newPath,
      response.path()
    );

    return response;
  };

  const downloadForIOSx = async ({ filename, url }) => {
    const path = ReactNativeBlobUtil.fs.dirs.DocumentDir + '/' + filename;
    const response = await ReactNativeBlobUtil.config({
      fileCache: true,
    }).fetch('GET', url);

    await ReactNativeBlobUtil.fs.appendFile(path, response.path(), 'uri');
    return response;
  };

  return (
    <Modal
      isVisible={isVisible}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      useNativeDriver
      animationOut={'fadeOutRight'}
      animationIn={'fadeInRight'}
    >
      <BaseView style={styles.container}>
        <Header
          title={title}
          left={
            <TouchableOpacity onPress={() => onClose()}>
              <Icon name={'chevron-left'} size={30} />
            </TouchableOpacity>
          }
          right={
            isLoading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity disabled onPress={() => downloadForIOS()}>
                <Icon
                  name={'download'}
                  size={30}
                  color={COLOR_BASE_PRIMARY_DARK}
                />
              </TouchableOpacity>
            )
          }
        />
        <Pdf
          trustAllCerts={false}
          source={{ uri: url }}
          renderActivityIndicator={percent => (
            <AnimatedCircularProgress
              size={120}
              width={15}
              fill={percent * 100}
              tintColor={COLOR_BASE_PRIMARY_MAIN}
              backgroundColor={COLOR_GREY}
              rotation={0}
            />
          )}
          onLoadProgress={() => setisLoading(true)}
          onLoadComplete={(numberOfPages, filePath) => {
            setisLoading(false);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            setisLoading(false);
            // Toast.show({
            //   type: 'error',
            //   text1: `Terjadi kesalahan saat download PDF`,
            // });
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
        <Toast />
      </BaseView>
    </Modal>
  );
};

export default App;
