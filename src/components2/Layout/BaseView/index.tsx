import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
// import MessageInfo from '@components/MessageInfo';
// import Snackbar from '@src/components/SnackBar';

import LottieView from 'lottie-react-native'; // if you have "esModuleInterop": true
import {
  COLOR_BACKGROUND,
  COLOR_BASE_PRIMARY_DARK,
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_BLACK,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_REAL_TRANSPARENT,
  COLOR_TRANSPARENT,
  COLOR_WHITE,
  COLOR_WHITE_OPACITY50,
} from '@themes/index';
import Loading from '../../Progress';
import Modal from 'react-native-modal';
import { Icon, ModalConfirmation } from '@components';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { Text, Button, Spacer, FocusAwareStatusBar } from '@components';
import Toast from 'react-native-toast-message';
import { isColorDark, toTransparent } from '@utils/uiHandler';
// import { useAuth } from '@authApp/hooks/useLogin';
import styles from './styles';
import { spacing } from '@constants/spacing';
import { useLogout } from '@authApp/hooks/useLogout';

type Props = {
  children: any,
  style?: StyleProp<ViewStyle>,
  bg?: ImageSourcePropType | null | Element,
  error?: any,
  baseModal?: 'force-logout' | 'logout' | 'notFound' | any,
  onCloseBaseModal?: Function,
  scrolling?: boolean,
  headerComponent?: any,
  statusBarColor?: string,
  navBarColor?: string,
  containerColor?: string,
};

const BaseView = ({
  children,
  style,
  error = {},
  bg = null,
  baseModal,
  onCloseBaseModal = () => {},
  scrolling,
  headerComponent,
  statusBarColor = COLOR_WHITE,
  navBarColor = COLOR_WHITE,
  containerColor = COLOR_WHITE,
}: Props) => {
  // const { doLogout, baseLoading } = useBaseView();
  const { action } = useLogout();

  const [isModalShow, setisModalShow] = useState(false);

  const ModalLogout = () => {
    return (
      <ModalConfirmation
        title={baseModal == 'logout' ? 'Log-out Akun' : 'Anda Ter log-out'}
        subTitle={
          baseModal == 'logout'
            ? 'Yakin mau keluar dari akun ini ?'
            : 'Otomatis Logout saat login di perangkat lain'
        }
        isVisible={baseModal == 'logout' || baseModal == 'force-logout'}
        onClose={() => onCloseBaseModal()}
        onSuccess={() => action()}
      />
    );
  };

  const customBackground = () => {
    if (bg !== null) {
      if (React.isValidElement(bg)) {
        return (
          <View style={{ flex: 1, position: 'absolute' }}>
            <View
              style={{
                position: 'absolute',
                zIndex: -9,
                height: heightByScreen(100),
                width: widthByScreen(100),
                // backgroundColor: 'rgba(150, 150, 150, 0.2)',
              }}
            />
            {bg}
          </View>
        );
      } else {
        return (
          <View style={{ flex: 1, position: 'absolute', bottom: 0 }}>
            <View
              style={{
                position: 'absolute',
                zIndex: -9,
                height: heightByScreen(100),
                width: widthByScreen(100),
                // backgroundColor: 'rgba(10, 10, 10, 0.2)',
              }}
            />
            <Image
              style={{
                zIndex: -10,
                height: heightByScreen(100),
                width: widthByScreen(100),
              }}
              source={bg} // local images
            />
          </View>
        );
      }
    }
    return null;
  };

  return (
    <>
      <View
        style={{
          backgroundColor: statusBarColor,
          height: 500,
          width: widthByScreen(100),
          position: 'absolute',
          top: 0,
          zIndex: -10,
        }}
      />
      <SafeAreaView style={{ flex: 9 }}>
        <FocusAwareStatusBar
          backgroundColor={'purple'}
          barStyle={
            isColorDark(statusBarColor) ? 'light-content' : 'dark-content'
          }
          translucent={false}
        />
        <View style={[{ backgroundColor: containerColor, flex: 1 }, style]}>
          {customBackground()}
          {children}
        </View>
        {ModalLogout()}
      </SafeAreaView>
      <View
        style={{
          backgroundColor: navBarColor,
          borderWidth: 1,
          height: 500,
          width: widthByScreen(100),
          position: 'absolute',
          bottom: -10,
          zIndex: -10,
        }}
      />
    </>
  );
};

export default BaseView;
