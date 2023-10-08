import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StatusBar,
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
  style?: ViewStyle,
  bg?: ImageSourcePropType,
  error?: any,
  baseModal?: 'force-logout' | 'logout' | 'notFound' | any,
  onCloseBaseModal?: Function,
  scrolling?: boolean,
  headerComponent?: any,
  statusBarColor?: string,
  containerColor?: string,
};

const BaseView = ({
  children,
  style,
  error = {},
  bg,
  baseModal,
  onCloseBaseModal = () => {},
  scrolling,
  headerComponent,
  statusBarColor = COLOR_WHITE,
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
  return (
    <SafeAreaView style={{ backgroundColor: statusBarColor, flex: 1 }}>
      <FocusAwareStatusBar
        backgroundColor={statusBarColor}
        barStyle={
          isColorDark(statusBarColor) ? 'dark-content' : 'light-content'
        }
        translucent={false}
      />
      <View style={[{ flex: 1, backgroundColor: containerColor }, style]}>
        {bg && (
          <View style={{ flex: 1, position: 'absolute', bottom: 0 }}>
            <View
              style={{
                position: 'absolute',
                zIndex: -9,
                height: heightByScreen(100),
                width: widthByScreen(100),
                backgroundColor: 'rgba(50, 50, 50,0.2 )',
              }}
            />
            <Image
              style={{
                zIndex: -10,
                height: heightByScreen(100),
                width: widthByScreen(100),
              }}
              source={bg}
            />
          </View>
        )}
        {children}
      </View>
      {ModalLogout()}
    </SafeAreaView>
  );
};

export default BaseView;
