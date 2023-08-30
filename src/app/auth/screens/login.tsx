import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import styles from './../styles';

import { BaseView, Text, Input, Spacer, Button, FastImage } from '@components';

import { spacing } from '@constants/spacing';
import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_REAL_TRANSPARENT,
  COLOR_WHITE,
} from '@themes/index';
import { navigate } from '@utils/navigation';
import IMAGES from '@images';
import { useAuth } from '@authApp/hooks/useAuth';
import { heightByScreen } from '@utils/dimensions';

const Screen = () => {
  const { doLogin, state, setState } = useAuth();

  // const [userName, setuserName] = useState('');
  // const [errUserName, seterrUserName] = useState(null);
  // const [password, setpassword] = useState('');

  const submit = () => {
    if (state.userName == '') {
      Toast.show({
        type: 'error',
        text1: 'Di isi dulu kolom nya ya ',
      });
      setState.seterrUserName('Username Tidak boleh kosong');
    } else doLogin(state.userName, state.password);
  };

  return (
    <BaseView bg={IMAGES.bgCitata}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View
        style={{
          padding: spacing.lg,
          paddingVertical: spacing.xxl,
          gap: 10,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <Image
            source={IMAGES.iconCitata}
            style={{ height: 100, width: 100 }}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </View>
        <Text size="header" weight="bold" color={COLOR_WHITE}>
          Masuk Akun
        </Text>
        <Text size="subTitle" color={COLOR_WHITE}>
          Silakan masuk dengan Akun yang terdaftar
        </Text>
      </View>
      <View style={styles.botLoginWrap}>
        <Input
          value={state.userName}
          placeholder="Username"
          onInteract={(txt: React.SetStateAction<string>) => {
            setState.setuserName(txt);
            setState.seterrUserName(null);
          }}
          error={state.errUserName}
        />
        <Input
          value={state.password}
          placeholder="Password"
          type="password"
          onInteract={(txt: React.SetStateAction<string>) =>
            setState.setpassword(txt)
          }
        />
        <View style={{ marginVertical: spacing.sm }}>
          <Button title="Masuk" onPress={() => submit()} />
        </View>
      </View>
    </BaseView>
  );
};

export default Screen;
