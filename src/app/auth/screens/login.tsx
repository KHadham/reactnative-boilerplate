import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import styles from './../styles';

import { BaseView, Text, Input, Spacer, Button } from '@components';

import { spacing } from '@constants/spacing';
import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_REAL_TRANSPARENT,
  COLOR_WHITE,
} from '@themes/index';
import { navigate } from '@utils/navigation';
import IMAGES from '@images';
import { useLogin } from '../hooks/useAuth';
import { heightByScreen } from '@utils/dimensions';

const Screen = () => {
  const { doLogin } = useLogin();
  const input1Ref = React.createRef();
  const input2Ref = React.createRef();

  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');

  const submit = () => {
    if (userName == '') {
      Toast.show({
        type: 'error',
        text1: 'Di isi dulu kolom nya ya ',
      });
    } else doLogin(userName, password);
  };

  return (
    <BaseView bg={IMAGES.bgCitata}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View
        style={{
          padding: spacing.lg,
          paddingVertical: spacing.xxl,
        }}
      >
        <Text size="header" weight="bold" color={COLOR_WHITE}>
          Masuk Akun
        </Text>
        <Text size="subTitle" color={COLOR_WHITE}>
          Silakan masuk dengan Akun yang terdaftar
        </Text>
      </View>

      <View style={styles.botLoginWrap}>
        <Input
          ref={input1Ref}
          value={userName}
          placeholder="Username"
          onInteract={(txt: React.SetStateAction<string>) => setuserName(txt)}
        />
        <Input
          ref={input2Ref}
          value={password}
          placeholder="Password"
          type="password"
          onInteract={(txt: React.SetStateAction<string>) => setpassword(txt)}
        />
        <View style={{ marginVertical: spacing.sm }}>
          <Button title="Masuk" onPress={() => submit()} />
        </View>
      </View>
    </BaseView>
  );
};

export default Screen;
