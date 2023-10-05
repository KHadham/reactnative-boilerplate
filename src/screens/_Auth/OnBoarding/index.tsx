import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';
import {
  BaseView,
  Text,
  Button,
  AutoImage,
  Carousel,
  Spacer,
  Header,
} from '@components';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { STORAGE_KEY } from '@constants/index';
import { storage } from '@utils/storage';

import { navigate } from '@utils/navigation';
import { spacing } from '@constants/spacing';
import { atom, useRecoilState } from 'recoil';
import { onBoardState } from '@utils/state';

const Screen = () => {
  const [storageValue, setStorageValue] = useRecoilState(onBoardState);

  const [noHp, setnoHp] = useState('');
  const storeData = async () => {
    await storage.set(STORAGE_KEY.SKIP_ONBOARD, 'true');
    setStorageValue(true);

    // try {
    //   // await storage.set(STORAGE_KEY.SKIP_ONBOARD, 'true');
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
            <Text size='header' style={{ textAlign: 'center' }}>
              {item?.title}
            </Text>
            <Text size='desc' style={{ textAlign: 'center' }}>{item?.desc}</Text>
          </View>
        )}
      />
      <View style={{ padding: spacing.sm }}>
        <Button title="Masuk" onPress={() => storeData()} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.line} />
          <Text style={{ margin: spacing.sm }}>
            Atau daftar sebagai
          </Text>
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
            style={{ flex: 1 }}
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
            style={{ flex: 1 }}
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
