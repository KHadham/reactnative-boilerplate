import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';
import { BaseView, Text, ItemList } from '@components';
import { spacing } from '@constants/spacing';
import { navigate } from '@utils/navigation';

const Screen = () => {
  const [baseModal, setbaseModal] = useState('');

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

  return (
    <BaseView
      style={{ padding: spacing.md }}
      baseModal={baseModal}
      onCloseBaseModal={() => setbaseModal('')}
    >
      <ScrollView>
        <Text size='title' style={{ marginVertical: spacing.md }}>Akun</Text>
        <ItemList
          desc="Data Pribadi"
          onPress={() => {
            navigate('Profile', 'DataPribadi');
          }}
        />
        <ItemList desc="Data Caleg" onPress={() => {}} />
        <ItemList
          desc="Keamanan Akun"
          onPress={() => {
            navigate('Profile', 'KeamananAkun');
          }}
        />
        <ItemList desc="Kode Undangan" onPress={() => {}} />

        <Text size='title' style={{ marginVertical: spacing.md }}>
          Informasi Lainya
        </Text>
        <ItemList desc="Kebijakan Privasi " onPress={() => {}} />
        <ItemList desc="Ketentuan Layanan" onPress={() => {}} />
        <ItemList desc="FAQ" onPress={() => {}} />
        <ItemList desc="Bantuan" onPress={() => {}} />
        <ItemList desc="Beri Rating" onPress={() => {}} />
        <ItemList
          desc="Logout"
          onPress={() => {
            setbaseModal('logout');
          }}
        />
      </ScrollView>
    </BaseView>
  );
};

export default Screen;
