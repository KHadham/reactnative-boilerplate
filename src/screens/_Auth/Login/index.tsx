import React, { useEffect, useState } from 'react';
import { View, Text as Txt, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import styles from './styles';

import { BaseView, Text, Input, Spacer, Button } from '@components';

import { spacing } from '@constants/spacing';
import { COLOR_BASE_PRIMARY_MAIN } from '@themes/index';
import { navigate } from '@utils/navigation';
import IMAGES from '@images';
import { useLogin } from './actions';
import { heightByScreen } from '@utils/dimensions';

const Screen = () => {
  const { isLoading, isLoggedIn, error, doLogin, doLogout } = useLogin();

  const [noHp, setnoHp] = useState('');

  const showToast = () => {};

  //   useEffect(() => {
  // Toast.show({
  //   type: 'success',
  //   text1: 'Hello',
  //   text2: 'This is some something 👋'
  // });

  //     return () => {
  //       second;
  //     };
  //   }, []);

  // const doLogin = () => {
  //   if (noHp == '') {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Isi dulu nomor nya ya 📞',
  //       visibilityTime: 1500,
  //     });
  //   } else doLogin('kminchelle', '0lelplR');
  //   // navigate('Verifikasi', {
  //   //   value: noHp,
  //   //   type: 'Whatsapp',
  //   // });
  // };

  return (
    <BaseView
      style={{ padding: spacing.lg, justifyContent: 'center' }}
      bg={IMAGES.bgCitata}
      isLoading={isLoading}
    >
      <ScrollView
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          elevation: 5,
          maxHeight: heightByScreen(70),
        }}
      >
        <Text size='header'>Masuk</Text>
        <Text size='desc'>Silakan masuk dengan No. HP yang terdaftar</Text>
        <Input
          label="Username"
          placeholder="Contoh: 165581"
          value={noHp}
          onInteract={(txt: React.SetStateAction<string>) => setnoHp(txt)}
          type="number"
        />
        <Input
          label="Kata sandi"
          placeholder="Contoh: 165581"
          value={noHp}
          onInteract={(txt: React.SetStateAction<string>) => setnoHp(txt)}
          type="password"
        />
        <Button
          title="Masuk"
          onPress={() => doLogin('kminchelle', '0lelplR')}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.line} />
          <Text size='desc' style={{ margin: spacing.sm }}>
            Atau daftar sebagai
          </Text>
          <View style={styles.line} />
        </View>
        <Button
          type="outline"
          title="Legislatif"
          onPress={() =>
            navigate('Register', {
              value: noHp,
              type: 'Whatsapp',
            })
          }
        />
        <Spacer />
        <Button
          style={{}}
          type="outline"
          title="Kepala Daerah"
          onPress={() =>
            navigate('Register', {
              value: noHp,
              type: 'Whatsapp',
            })
          }
        />
        <Text style={{ margin: spacing.sm }}>
          Dengan masuk saya menyetujui
          <Text
            color={COLOR_BASE_PRIMARY_MAIN}
            onPress={() => showToast()}
          >
            {' Kebijakan Privasi '}
          </Text>
          serta
          <Text
            onPress={() =>
              navigate('Register', {
                value: noHp,
                type: 'Whatsapp',
              })
            }
            color={COLOR_BASE_PRIMARY_MAIN}
          >
            {' Ketentuan Layanan '}
          </Text>
          yang berlaku
        </Text>
        <Spacer />
      </ScrollView>
    </BaseView>
  );
};

export default Screen;
