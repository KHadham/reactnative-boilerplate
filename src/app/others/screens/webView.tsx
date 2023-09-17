import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-toast-message';
import { BaseView, Header } from '@components';
import { useNavigationHandler } from '@utils/navigation';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';

const Screen = () => {
  const { getParam } = useNavigationHandler();

  const param: {
    item?: {
      name: string,
      url: string,
    },
  } = getParam() || {};

  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const webviewRef = useRef<WebView | null>(null);

  const backHandler = useCallback(() => {
    if (canGoBack && webviewRef.current) {
      webviewRef.current.goBack();
      return true;
    } else {
      return false;
    }
  }, [canGoBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
    };
  }, [backHandler]);

  const handleError = () => {
    setIsLoading(false);
    Toast.show({
      type: 'error',
      text1: 'Terjadi Kesalahan Saat Memuat Aplikasi...',
    });
  };

  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
  };

  const customHeaders = {
    Authorization: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
  };
  return (
    <BaseView style={{ flex: 1, width: '100%', height: '100%' }}>
      <Header title={param?.item?.name} />
      <WebView
        ref={webviewRef}
        // originWhitelist={['*']}
        source={{ uri: param?.item?.url, headers: customHeaders }}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        onHttpError={handleError}
        // renderError={handleError}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        pullToRefreshEnabled
      />
    </BaseView>
  );
};

export default Screen;
