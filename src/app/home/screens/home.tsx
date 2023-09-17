import React, { useEffect, useState } from 'react';
import { Image, View, ImageSourcePropType } from 'react-native';
import IMAGES from '@images';
import { FastImage, Header, Carousel, Button } from '@components';
import { useNavigationHandler } from '@utils/navigation';
import { BaseView, Text } from '@components';
import { useHooks } from '@homeApp/hooks/useCarousel';
import { useHooks as useApp } from '@homeApp/hooks/useSubApps';
import { FlashList } from '@shopify/flash-list';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { ScrollView } from 'react-native-gesture-handler';
import { spacing } from '@constants/spacing';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import styles from '@homeApp/styles';
import { useProfileStore } from '@profileApp/stores/storage';

const App: React.FC = () => {
  const { navigate } = useNavigationHandler();
  const { user } = useProfileStore();

  const { data: carouselData, isLoading } = useHooks();
  const { data: apps, isLoading: loadingApp } = useApp();

  return (
    <BaseView>
      <Header
        left={
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Image
              source={IMAGES.iconCitata}
              style={{ height: 50, width: 50, position: 'absolute' }}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </View>
        }
        title="DCKTRP Mobile"
        shadow
      />
      <ScrollView style={{ flex: 1 }}>
        <Carousel
          indicator
          previewAble
          mode="parallax"
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
                <Image source={{ uri: item.img }} style={styles.sliderImage} />
              )}
            </View>
          )}
        />
        <View style={{ padding: spacing.md }}>
          <FlashList
            ListHeaderComponent={
              <View style={{ marginBottom: spacing.lg }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text size="subTitle">Selamat datang</Text>
                  <Text size="subTitle" weight="bold">
                    , {user?.nama}
                  </Text>
                </View>
                <Text size="desc">Mau survey apa hari ini ?</Text>
              </View>
            }
            data={apps}
            estimatedItemSize={15}
            numColumns={4}
            renderItem={({ item, index }) => (
              <Button
                onPress={() => {
                  //
                  if (item.mobile_class_name == 'SimpusApp') {
                    navigate({ screen: 'Simpus', params: { item } });
                  } else if (item.mobile_class_name == 'SemeterApp') {
                    navigate({ screen: 'Semeter', params: { item } });
                  } else {
                    navigate({ screen: 'WebView', params: { item } });
                  }
                }}
                containerStyle={styles.appMenuWrap}
              >
                <View style={styles.appMenu}>
                  <FastImage source={item?.icon} style={styles.appImage} />
                </View>
                <Text size="info" weight="bold" style={{ textAlign: 'center' }}>
                  {item?.name}
                </Text>
              </Button>
            )}
          />
        </View>
      </ScrollView>
    </BaseView>
  );
};

export default App;
