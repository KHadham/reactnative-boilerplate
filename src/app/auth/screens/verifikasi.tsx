import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';

import { BaseView, Header, Text, Input, Button } from '@components';

import { spacing } from '@constants/spacing';
import { COLOR_BASE_PRIMARY_MAIN } from '@themes/index';
import { getParams, navigate } from '@utils/navigation';

type ParamsProps = {
  value?: string,
  type?: 'Whatsapp' | 'Email' | 'Pin',
};

const Screen = () => {
  const params: ParamsProps = getParams();
  const [otp, setotp] = useState('');
  const [title, settitle] = useState('');

  useEffect(() => {
    if (params?.type == 'Pin') settitle('Verifikasi Pin');
    else settitle('Masukkan Kode Verifikasi');
  }, []);

  const doSubmit = () => {
    Toast.show({
      type: 'success',
      text1: 'Berhasil verifikasi 👋',
    });
    navigate('Tab');
  };

  return (
    <BaseView style={{}}>
      <Header right="bantuan" />
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <View
          style={{
            padding: spacing.md,
            justifyContent: 'space-between',
            flex: 0.5,
          }}
        >
          <Text size='title' type={['bold', 'italic']}>{title}</Text>
          {params.type == 'Pin' ? (
            <Text size='desc'>Masukkan PIN keamanan Anda</Text>
          ) : (
            <Text size='desc'>
              Kami telah mengirimkan kode OTP verifikasi ke nomor
              <Text weight='bold'> {params?.value} </Text>
              melalui {params?.type}
            </Text>
          )}
          <Input
            type="otp"
            value={otp}
            length={6}
            onInteract={(txt: React.SetStateAction<string>) => setotp(txt)}
          />
          {params.type !== 'Pin' && (
            <Text size='desc'
              color={COLOR_BASE_PRIMARY_MAIN}
              style={{ textAlign: 'center' }}
            >
              Kirim Ulang Kode
            </Text>
          )}
          <Button title="Verifikasi" onPress={() => doSubmit()} />
        </View>
      </View>
    </BaseView>
  );
};

export default Screen;
