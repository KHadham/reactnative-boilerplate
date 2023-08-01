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
  COLOR_BASE_PRIMARY_DARK,
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_REAL_TRANSPARENT,
  COLOR_TRANSPARENT,
  COLOR_WHITE,
  COLOR_WHITE_OPACITY50,
} from '@themes/index';
import Loading from '../Loading';
import Modal from 'react-native-modal';
import { Icon } from '@components';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { Text, Button, Spacer } from '@components';
import Toast from 'react-native-toast-message';
import { toTransparent } from '@utils/uiHandler';
import { useLogin } from '@authApp/hooks/useAuth';
import { useGlobalLoading } from '@utils/state/globalLoading';
import styles from './styles';
import { spacing } from '@constants/spacing';

type Props = {
  children: any,
  style?: ViewStyle,
  bg?: ImageSourcePropType,
  error?: any,
  baseModal?: 'force-logout' | 'logout' | 'notFound' | any,
  onCloseBaseModal?: Function,
  scrolling?: boolean,
  headerComponent?: any,
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
}: Props) => {
  const globalLoading = useGlobalLoading(state => state.isLoading);

  // const { doLogout, baseLoading } = useBaseView();
  const { doLogout } = useLogin();

  const [isModalShow, setisModalShow] = useState(false);

  // useEffect(() => {
  //   !isLoading
  //     ? Toast.hide()
  //     : Toast.show({
  //         type: 'loading',
  //         text1: 'Memuat Data ...',
  //         autoHide: false,
  //       });
  // }, [isLoading]);

  // useEffect(() => {
  //   !baseLoading
  //     ? Toast.hide()
  //     : Toast.show({
  //         type: 'loading',
  //         text1: 'Sedang Logout ...',
  //         autoHide: false,
  //       });
  // }, [baseLoading]);

  const doRefreshToken = () => {
    setisModalShow(false);
    // ...
  };

  const ModalLogout = () => {
    return (
      <Modal
        isVisible={baseModal == 'logout' || baseModal == 'force-logout'}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        swipeDirection={'down'}
        onBackdropPress={() => onCloseBaseModal()}
        onBackButtonPress={() => onCloseBaseModal()}
        onSwipeComplete={() => onCloseBaseModal()}
      >
        <SafeAreaView
          style={{
            backgroundColor: 'white',
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          }}
        >
          <View
            style={{ padding: spacing.sm, alignItems: 'center', width: '100%' }}
          >
            <View
              style={{
                borderWidth: 2,
                width: spacing.xxl,
                borderRadius: 100,
                borderColor: COLOR_FONT_PRIMARY_DARK,
              }}
            />
          </View>
          <View style={{ padding: 20, paddingTop: 0 }}>
            {/* modal content Start here */}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text size="title" weight="bold">
                {baseModal == 'logout' ? 'Log-out Akun' : 'Anda Ter log-out'}
              </Text>
              {/* <Icon
                name={'minus'}
                size={30}
                color={COLOR_FONT_PRIMARY_DARK}
                onPress={() => onCloseBaseModal()}
              /> */}
            </View>
            <Text size="desc">
              {baseModal == 'logout'
                ? 'Yakin mau keluar dari akun ini ?'
                : 'Otomatis Logout saat login di perangkat lain'}
            </Text>
            {baseModal == 'logout' && (
              <>
                <Spacer size="sm" />
                <View style={{ flexDirection: 'row' }}>
                  <Button
                    onPress={() => {
                      onCloseBaseModal();
                      doLogout();
                    }}
                    title="Yakin"
                    containerStyle={{ flex: 1 }}
                    color="success"
                  />
                  <Spacer />
                  <Button
                    onPress={() => onCloseBaseModal()}
                    containerStyle={{ flex: 1 }}
                    color="danger"
                    title="Batal"
                  />
                </View>
              </>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLOR_WHITE, flex: 1 }}>
      {headerComponent}
      {globalLoading == 'auth' && <View style={styles.loadingBackground} />}
      {bg && (
        <View style={{ flex: 1, position: 'absolute', bottom: 0 }}>
          <View
            style={{
              position: 'absolute',
              zIndex: -9,
              height: heightByScreen(100),
              width: widthByScreen(100),
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
      <View style={[style, { flex: 1 }]}>{children}</View>
      {ModalLogout()}
    </SafeAreaView>
  );
};

export default BaseView;
