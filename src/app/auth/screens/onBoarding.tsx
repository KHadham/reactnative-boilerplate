import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Image, StatusBar, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from '../styles';
import {} from '@components';
import { BaseView, Text, Button, FastImage, Icon, Stepper } from '@components';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { STORAGE_KEY } from '@constants/index';
import { requestPermission } from '@utils/permissions';

import { useNavigationHandler } from '@utils/navigation';
import { spacing } from '@constants/spacing';
import {
  handleHorizontalScroll,
  scrollToIndexHorizontal,
} from '@utils/uiHandler';
import {
  COLOR_BACKGROUND,
  COLOR_BASE_PRIMARY_DARK,
  COLOR_WHITE,
} from '@themes/index';

import Modal from 'react-native-modal';
import { storage } from '@utils/storage';
// import { onBoardState } from 'src/state';

const data = [
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/1200px-Sunflower_from_Silesia2.jpg',
    title: 'Izin akses notifikasi',
    desc: 'DCKTRP meminta izin akses notifikasi untuk mengirim info notifikasi',
    type: 'notification',
    icon: 'bell-ring',
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/1200px-Sunflower_from_Silesia2.jpg',
    title: 'Izin akses kamera',
    desc: 'DCKTRP meminta izin akses kamera untuk memperbarui profil anda dan kegiatan penngambilan gambar untuk survey anda',
    type: 'camera',
    icon: 'camera-plus',
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/99.jpeg',
    title: 'Izin akses galeri',
    desc: 'DCKTRP meminta izin akses galeri untuk memperbarui profil anda dan kegiatan penngambilan gambar untuk kegiatan survey anda',
    type: 'gallery',
    icon: 'camera-image',
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/99.jpeg',
    title: 'Izin akses lokasi',
    desc: 'DCKTRP meminta izin akses lokasi untuk setiap kegiatan survey yang anda buat',
    type: 'location',
    icon: 'map-marker-radius',
  },
];

function Screen() {
  const { navigate } = useNavigationHandler();
  // const [storageValue, setStorageValue] = useRecoilState(onBoardState);

  const scrollViewRef = useRef(null);
  // const [isRequesting, setisRequesting] = useState(null);

  const [step, setstep] = useState(1);
  const [welcome, setwelcome] = useState(true);

  useEffect(() => {
    // scrollToIndexHorizontal(step, scrollViewRef);
  }, []);

  const goNext = () => {
    if (step >= data.length) {
      // set onboard status
      storage.setItem(STORAGE_KEY.SKIP_ONBOARD, 'true');
      navigate({
        parent: 'Auth',
        screen: 'Login',
      });
    } else {
      setstep(step + 1);
      scrollToIndexHorizontal(step + 1, scrollViewRef);
    }
  };

  const requestHandler = () => {
    requestPermission({ type: data[step - 1].type })
      .then(result => {
        goNext();
        console.log('Permission result:', result);
      })
      .catch(error => {
        // Handle the error
        console.error('Permission error:', error);
      });
  };

  const welcomeModal = () => {
    return (
      <Modal
        isVisible={welcome}
        animationIn={'fadeInUp'}
        animationOut={'fadeOutDown'}
      >
        <View style={styles.welcomeModal}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <FastImage
              source={IMAGES.LogoCitata}
              resizeMode="contain"
              style={styles.imageLogoBanner}
            />
          </View>
          <Text
            size="subTitle"
            style={{ textAlign: 'center', marginVertical: spacing.lg }}
          >
            Dinas cipta karya tata ruang dan pertanahan menghadirkan inovasi
            digital yang berbasis web dan mobile
          </Text>
          <Button
            style={{ width: '100%' }}
            title="Yuk Mulai"
            onPress={() => {
              setwelcome(false);
            }}
          />
        </View>
      </Modal>
    );
  };

  return (
    <BaseView>
      {welcomeModal()}
      <View style={{ flex: 1, backgroundColor: COLOR_WHITE }}>
        <ScrollView
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          ref={scrollViewRef}
          onMomentumScrollEnd={event =>
            handleHorizontalScroll(event).then(
              (data: React.SetStateAction<number>) => setstep(data)
            )
          }
        >
          {data.map(
            (
              item: { image: any, title: any, desc: any, icon: string },
              index: any
            ) => (
              <View
                key={index}
                style={{
                  width: widthByScreen(100),
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: spacing.lg,
                }}
              >
                {/* <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: spacing.md,
                    borderWidth: 1,
                  }}
                >
                  <FastImage
                    source={item?.image}
                    resizeMode="contain"
                    style={styles.imageLogoBanner}
                  />
                </View> */}

                <Text
                  weight="bold"
                  size="header"
                  color={COLOR_BASE_PRIMARY_DARK}
                  style={{}}
                >
                  {item?.title}
                </Text>
                <Icon
                  name={item.icon}
                  size={40}
                  style={{ margin: spacing.lg }}
                />
                <Text size="subTitle" style={{ textAlign: 'center' }}>
                  {item?.desc}
                </Text>
              </View>
            )
          )}
        </ScrollView>
      </View>
      <View style={styles.botBar}>
        <View style={{ flex: 1 }} />
        <Stepper
          color={COLOR_BASE_PRIMARY_DARK}
          containerStyle={{ flex: 2 }}
          dataStep={data?.length}
          currentStep={step}
        />
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text weight="bold" onPress={() => requestHandler()} style={{}}>
            Izinkan
          </Text>
        </View>
      </View>
    </BaseView>
  );
}

export default Screen;
