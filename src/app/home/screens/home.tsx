import React, { useEffect, useState } from 'react';
import { FlatList, Image, SectionList, TouchableOpacity, View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

import IMAGES from '@images';
import {
  BaseView,
  Text,
  FastImage,
  Header,
  Carousel,
  Button,
  ModalBasic,
  Icon,
} from '@components';
import { FlashList } from '@shopify/flash-list';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigationHandler } from '@utils/navigation';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { spacing } from '@constants/spacing';

import styles from '@homeApp/styles';

import { useProfileStore } from '@profileApp/stores/storage';
import { useHooks } from '@homeApp/hooks/useCarousel';
import { useHooks as useApp } from '@homeApp/hooks/useSubApps';
import { useHooks as usePermission  } from '@homeApp/hooks/usePermission';
import { useHooks as useDetailGaleri } from '@homeApp/hooks/useDetailGaleri';
import { COLOR_WHITE } from '@themes/index';

const App: React.FC = () => {
  const [firstModal, setfirstModal] = useState(false);
  const { navigate } = useNavigationHandler();
  const { user } = useProfileStore();
//   const { action } = usePermission();

//  useEffect(() => {
//   action()
//  }, [])
 
  // const { data } = useGaleri();
  const { data: galeri } = useDetailGaleri();

  const { data: carouselData, isLoading } = useHooks();
  const { data: apps, isLoading: loadingApp } = useApp();
  return (
    <BaseView>
      <Header
        left={
          <Image
            source={IMAGES.iconCitata}
            style={{ height: 50, width: 50, flex: 1 }}
          />
        }
        title="DCKTRP Mobile"
        shadow
      />
      <View style={{ flex: 1 }}>
        <View>
          <FlatList
            ListHeaderComponent={
              <View>
                <Carousel
                  indicator
                  previewAble
                  width={widthByScreen(100)}
                  height={heightByScreen(20)}
                  data={carouselData}
                  autoPlay={true}
                  autoPlayInterval={2000}
                  renderItem={({ item, index }) => (
                    <View style={styles.sliderImageWrap} key={index}>
                      {isLoading ? (
                        <ShimmerPlaceholder
                          LinearGradient={LinearGradient}
                          style={styles.sliderImage}
                        />
                      ) : (
                        <Image
                          source={{ uri: item.img }}
                          style={styles.sliderImage}
                        />
                      )}
                    </View>
                  )}
                />
                <View style={{ margin: spacing.md, marginBottom: 0 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text size="subTitle">Selamat datang</Text>
                    <Text size="subTitle" weight="bold">
                      , {user?.nama}
                    </Text>
                  </View>
                  <Text size="desc">Mau survey apa hari ini ?</Text>
                </View>
              </View>
            }
            data={apps}
            numColumns={4}
            renderItem={({ item, index }) => (
              <Button
                onPress={() => {
                  if (item.mobile_class_name == 'SimpusApp') {
                    navigate({ screen: 'Simpus', params: { item } });
                  } else if (item.mobile_class_name == 'SemeterApp') {
                    navigate({ screen: 'Semeter', params: { item } });
                  } else {
                    navigate({ screen: 'WebView', params: { item } });
                  }
                }}
                style={styles.appMenuWrap}
              >
                <View style={styles.appMenu}>
                  <FastImage
                    source={{ uri: item?.icon }}
                    style={styles.appImage}
                  />
                </View>
                <Text size="info" weight="bold" style={{ textAlign: 'center' }}>
                  {item?.name}
                </Text>
              </Button>
            )}
            ListFooterComponent={
              <View style={{ paddingHorizontal: spacing.md, gap: spacing.sm }}>
                <Text size="title" weight="bold">
                  Galleri
                </Text>
                <FlatList
                  data={galeri}
                  ItemSeparatorComponent={() =>
                    <View style={{ margin: spacing.sm }} />
                  }
                  renderItem={({ item, index }) => (
                    <>
                      <Text weight="bold">{item.title}</Text>
                      <View
                        style={{ borderWidth: 1, borderColor: COLOR_WHITE }}
                      >
                        <FlatList
                          numColumns={3}
                          data={item.data}
                          renderItem={({ item, index }) => (
                            <View
                              style={{
                                borderWidth: 2,
                                flex: 1,
                                borderColor: COLOR_WHITE,
                              }}
                            >
                              <FastImage
                                previewAble
                                source={{ uri: item }}
                                style={{
                                  height: 120,
                                  // width: widthByScreen(25),
                                }}
                              />
                            </View>
                          )}
                        />
                      </View>
                    </>
                  )}
                />
              </View>
            }
          />
        </View>
      </View>
      <Modal
        isVisible={firstModal}
        onBackButtonPress={() => setfirstModal(false)}
        onBackdropPress={() => setfirstModal(false)}
        useNativeDriver={true}
      >
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => setfirstModal(false)}
            style={{
              position: 'absolute',
              zIndex: 100,
              backgroundColor: COLOR_WHITE,
              right: 10,
              borderRadius: 100,
            }}
          >
            <Icon name={'close'} />
          </TouchableOpacity>
          <FastImage
            previewAble
            source={{
              uri: 'https://dcktrp.jakarta.go.id/beranda/v.1/assets/file/foto/Pencegahan_Polusi_di_Area_Konstruksi_-_Flyer1.jpg',
            }}
            resizeMode="contain"
            style={{
              height: heightByScreen(85),
              width: widthByScreen(80),
            }}
          />
        </View>

      </Modal>
    </BaseView>
  );
};

export default App;
//
