import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  ViewStyle,
} from 'react-native';
// import MessageInfo from '@components/MessageInfo';
// import Snackbar from '@app/components/SnackBar';

import LottieView from 'lottie-react-native'; // if you have "esModuleInterop": true
import { COLOR_FONT_PRIMARY_DARK, COLOR_WHITE } from '@app/styles';
import Loading from '../Loading';
import Modal from 'react-native-modal';
import { Icon } from '@components/index';
import { heightByScreen } from '@app/helper/dimensions';
import { Text, Button, Spacer } from '@components/index';
import { useBaseView } from './actions';
type Props = {
  children: any,
  style?: ViewStyle,
  isLoading?: boolean,
  bg?: string,
  error?: any,
  baseModal?: any | 'logout' | 'notFound',
  onCloseBaseModal?: Function,
  scrolling?: boolean,
  headerComponent?: any,
};

const BaseView = ({
  children,
  style = { flex: 1 },
  error = {},
  isLoading = false,
  bg = '',
  baseModal,
  onCloseBaseModal = () => {},
  scrolling,
  headerComponent,
}: Props) => {
  const { doLogout, baseLoading } = useBaseView();

  const [isModalShow, setisModalShow] = useState(false);
  // useEffect(() => {
  //   setisModalShow(error == '' ? false : true);
  // }, [error]);

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
          <View style={{ padding: 20 }}>
            {/* modal content Start here */}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text.Title>
                {baseModal == 'logout' ? 'Logout Akun' : 'Anda Terlogout'}
              </Text.Title>
              <Icon
                name={'close'}
                size={30}
                color={COLOR_FONT_PRIMARY_DARK}
                onPress={() => onCloseBaseModal()}
              />
            </View>
            <Text.Desc>
              {baseModal == 'logout'
                ? 'Yakin mau keluar dari akun ini ?'
                : 'Akun anda login di perangkat lain'}
            </Text.Desc>
            {baseModal == 'logout' && (
              <>
                <Spacer size="lg" />
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
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      {headerComponent}
      {bg && (
        <Image
          style={{
            position: 'absolute',
            zIndex: -10,
            height: heightByScreen(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={bg}
        />
      )}
      {/* {(isLoading || baseLoading) && <Loading />}
      {scrolling ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={style}>{children}</View>
        </ScrollView>
      ) : (
        )} */}
        <View style={style}>{children}</View>
      {/* {ModalLogout()} */}
    </SafeAreaView>
  );
};

export default BaseView;
