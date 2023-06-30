import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components/index';
import {
  BaseView,
  Text,
  Button,
  AutoImage,
  Carousel,
  Spacer,
  Header,
} from '@app/components';
import { heightByScreen, widthByScreen } from '@app/helper/dimensions';
import { STORAGE_KEY } from '@app/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { navigate } from '@app/helper/navigation';
import { spacing } from '@app/constants/spacing';
import { atom, useRecoilState } from 'recoil';
import { onBoardState } from '@state';

const Screen = () => {
  const [storageValue, setStorageValue] = useRecoilState(onBoardState);

  const [noHp, setnoHp] = useState('');
  const storeData = async () => {
    await AsyncStorage.setItem(STORAGE_KEY.SKIP_ONBOARD, 'true');
    setStorageValue(true);

    // try {
    //   // await AsyncStorage.setItem(STORAGE_KEY.SKIP_ONBOARD, 'true');
    //   // navigate('Login');
    // } catch (e) {
    //   // saving error
    // }
  };

  return (
    <BaseView style={{}} scrolling>
      <Header
        left="null"
        right="skip"
        onPressRight={() => storeData()}
        shadow={false}
      />
      <Carousel
        containerStyle={{}}
        data={[
          {
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            title: 'DCKTRP Dilengkapi dengan Data Real Time',
            desc: 'DCKTRP menghadirkan inovasi digital yang dirancang untuk pemenangan legislatif hingga kepala daerah yang berbasis web dan mobile',
          },
          {
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/1200px-Sunflower_from_Silesia2.jpg',
            title: 'DCKTRP Dilengkapi dengan Data Real Time',
            desc: 'DCKTRP menghadirkan inovasi digital yang dirancang untuk pemenangan legislatif hingga kepala daerah yang berbasis web dan mobile',
          },
          {
            image: 'https://rickandmortyapi.com/api/character/avatar/99.jpeg',
            title: 'DCKTRP 3',
            desc: 'DCKTRP menghadirkan inovasi digital yang dirancang untuk pemenangan legislatif hingga kepala daerah yang berbasis web dan mobile',
          },
        ]}
        renderItem={(
          item: { image: any, title: any, desc: any },
          index: any
        ) => (
          <View
            style={{
              padding: spacing.md,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AutoImage
              source={{ uri: item?.image }}
              maxWidth={widthByScreen(90)}
              style={{ borderRadius: 20, marginBottom: spacing.md }}
            />
            <Text.Header style={{ textAlign: 'center' }}>
              {item?.title}
            </Text.Header>
            <Text.Desc style={{ textAlign: 'center' }}>{item?.desc}</Text.Desc>
          </View>
        )}
      />
      <View style={{ padding: spacing.sm }}>
        <Button title="Masuk" onPress={() => storeData()} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.line} />
          <Text.Info style={{ margin: spacing.sm }}>
            Atau daftar sebagai
          </Text.Info>
          <View style={styles.line} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button
            type="outline"
            title="Legislatif"
            containerStyle={{ flex: 1 }}
            onPress={() =>
              navigate({
                parent: 'Auth',
                screen: 'Verifikasi',
                params: {
                  value: noHp,
                  type: 'Whatsapp',
                },
              })
            }
          />
          <Spacer />
          <Button
            type="outline"
            title="Kepala Daerah"
            containerStyle={{ flex: 1 }}
            onPress={() =>
              navigate({
                parent: 'Auth',
                screen: 'Verifikasi',
                params: {
                  value: noHp,
                  type: 'Whatsapp',
                },
              })
            }
          />
        </View>
      </View>
    </BaseView>
  );
};

export default Screen;
