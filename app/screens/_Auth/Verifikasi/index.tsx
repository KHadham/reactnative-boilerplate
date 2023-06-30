import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components/index';

import { BaseView, Header, Text, Input, Button } from '@components/index';

import { spacing } from '@app/constants/spacing';
import { COLOR_BASE_PRIMARY_MAIN } from '@app/styles';
import { getParams, navigate } from '@helper/navigation';

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
          <Text.Title type={['bold', 'italic']}>{title}</Text.Title>
          {params.type == 'Pin' ? (
            <Text.Desc>Masukkan PIN keamanan Anda</Text.Desc>
          ) : (
            <Text.Desc>
              Kami telah mengirimkan kode OTP verifikasi ke nomor
              <Text.Bold> {params?.value} </Text.Bold>
              melalui {params?.type}
            </Text.Desc>
          )}
          <Input
            type="otp"
            value={otp}
            length={6}
            onInteract={(txt: React.SetStateAction<string>) => setotp(txt)}
          />
          {params.type !== 'Pin' && (
            <Text.Desc
              color={COLOR_BASE_PRIMARY_MAIN}
              style={{ textAlign: 'center' }}
            >
              Kirim Ulang Kode
            </Text.Desc>
          )}
          <Button title="Verifikasi" onPress={() => doSubmit()} />
        </View>
      </View>
    </BaseView>
  );
};

export default Screen;
