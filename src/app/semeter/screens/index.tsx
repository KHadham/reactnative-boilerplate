import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  BaseView,
  Button,
  GpsMarker,
  Header,
  Icon,
  ModalConfirmation,
  ModalList,
  ModalRegionSearch,
  Text,
  ModalBasic,
  LoadingWraper,
  FastImage,
} from '@components';
import { useNavigationHandler } from '@utils/navigation';

import { Marker, UrlTile } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

import { useHooks } from '@semeterApp/hooks';
import { useHooks as formHook } from '@semeterApp/hooks/form';
import styles from '@semeterApp/styles';
import {
  animateMapToTargetRegion,
  gpsEnabler,
  getCurrentLocation,
} from '@utils/location';
import {
  COLOR_BASE_PRIMARY_DARK,
  COLOR_EVENT_ERROR,
  COLOR_EVENT_INFORMATION,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_WHITE,
} from '@themes/index';
import { MARKER } from '@images';
import colors from '@themes/colors';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import {
  ColorMatrix,
  concatColorMatrices,
  contrast,
  rgba,
  saturate,
} from 'react-native-color-matrix-image-filters';
import {
  LayoutAnimationHandler,
  hexToMatrix,
  isColorDark,
} from '@utils/uiHandler';
import { spacing } from '@constants/spacing';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { toTitleCase, trimUrlCitata } from '@utils/index';
import { FlashList } from '@shopify/flash-list';

const Screen = () => {
  const { navigate } = useNavigationHandler();

  const { data, isLoading, actions, states, ref } = useHooks();
  const { data: dataform } = formHook();
  const [isSearchingVisible, setisSearchingVisible] = useState(false);

  useEffect(() => {
    LayoutAnimationHandler();
  }, [states.detailMarker]);

  const tindakanToImage = {
    0: MARKER.marker,
    1: MARKER.markerPemberitahuan,
    2: MARKER.markerSp,
    3: MARKER.markerSp,
    4: MARKER.markerSp,
    5: MARKER.markerSegel,
    6: MARKER.markerSpb,
    7: MARKER.markerBongkar,
  };

  const groupToColor = {
    0: colors.orange.orange_60,
    1: colors.bronze.bronze_60,
    2: colors.green.green_40,
    3: colors.purple.purple_40,
    4: colors.sky.sky_40,
    5: colors.sky.sky_40,
    6: colors.dusk.dusk_50,
  };

  const getPointCountColor = (count: number) => {
    const colors = [
      '#14ff00',
      '#d2d500',
      '#f1b800',
      '#f9a900',
      '#ff990b',
      '#ff8519',
      '#ff6f26',
      '#ff5832',
      '#ff3e3e',
    ];
    const cappedCount = Math.min(count, 1500);
    // Calculate the index based on the count and color range
    const index = Math.floor((cappedCount / 1500) * (colors.length - 1));
    return colors[index];
  };

  // todo
  // pending modal detail show
  //  get permision to do crud

  return (
    <BaseView>
      <Header
        title={'SEMETER'}
        right={
          <Button
            style={{ padding: 10 }}
            onPress={() => setisSearchingVisible(!isSearchingVisible)}
          >
            {isLoading ? <ActivityIndicator /> : <Icon name="magnify" />}
          </Button>
        }
      />
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <MapView
          tracksViewChanges={false}
          radius={40}
          ref={ref}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          provider={Platform.OS == 'android' ? 'google' : null}
          initialRegion={{
            // lokasi monas
            latitude: -6.1754,
            longitude: 106.8272,
            latitudeDelta: 2.5,
            longitudeDelta: 2.5,
          }}
          renderCluster={(cluster: any) => {
            const { geometry, onPress, id, properties } = cluster;
            return (
              <Marker
                key={id}
                coordinate={{
                  longitude: geometry.coordinates[0],
                  latitude: geometry.coordinates[1],
                }}
                tracksViewChanges={false}
                onPress={onPress}
              >
                <View
                  style={{
                    borderWidth: 0.5,
                    backgroundColor: getPointCountColor(
                      properties?.point_count
                    ),
                    minWidth: widthByScreen(6),
                    minHeight: widthByScreen(6),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                  }}
                >
                  <Text
                    weight="bold"
                    size="info"
                    color={
                      isColorDark(getPointCountColor(properties?.point_count))
                        ? COLOR_FONT_PRIMARY_DARK
                        : COLOR_WHITE
                    }
                  >
                    {properties?.point_count}
                  </Text>
                </View>
              </Marker>
            );
          }}
        >
          {data?.features?.map((item, index) => {
            const image =
              tindakanToImage[item.attributes.KD_JENIS_TINDAKAN] ||
              MARKER.marker;
            const group = groupToColor[item.attributes.GROUP_BY_ID];
            return (
              <Marker
                key={`${index}~${item.geometry.y}`}
                coordinate={{
                  latitude: item.geometry.y,
                  longitude: item.geometry.x,
                }}
                tracksViewChanges={false}
                onPress={() => actions.onPressMarker(item)}
                style={{
                  borderWidth: 3,
                  borderRadius: 100,
                }}
              >
                <ColorMatrix matrix={hexToMatrix(group)}>
                  <Image
                    source={image}
                    style={{
                      width: widthByScreen(5),
                      height: widthByScreen(5),
                    }}
                  />
                </ColorMatrix>
              </Marker>
            );
          })}

          <GpsMarker coordinate={states.coordinate} />
          {states?.layerList?.name == 'Peta Struktur' && (
            <UrlTile
              urlTemplate={
                'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
              }
              flipY={false}
              tileSize={256}
            />
          )}
          {states?.layerList?.name == 'Peta Ops' && (
            <UrlTile
              urlTemplate={
                'https://tataruang.jakarta.go.id/server/rest/services/Peta_Dasar_Tile/MapServer/tile/{z}/{y}/{x}'
              }
              flipY={false}
              tileSize={256}
            />
          )}
          {states?.layerList?.name == 'Kawasan Reklame' && (
            <UrlTile
              urlTemplate={
                'https://tataruang.jakarta.go.id/server/rest/services/Kawasan_Reklame_Tile/MapServer/tile/{z}/{y}/{x}'
              }
              flipY={false}
              tileSize={256}
            />
          )}
        </MapView>
        <Button
          type="fab"
          onPress={() => actions.setmodalLayer(true)}
          icon="layers-triple-outline"
          position="top-right"
        />
        {/* <Button
          type="fab"
          onPress={() => actions.getLocation()}
          icon="crosshairs-gps"
          isLoading={isLoading}
        /> */}
        <Button
          type="fab"
          onPress={() => navigate({ screen: 'Form' })}
          icon="plus"
        />
      </View>
      <ModalList
        isSearch={false}
        data={[
          {
            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            name: 'Peta Struktur',
          },
          {
            url: 'https://tataruang.jakarta.go.id/server/rest/services/Peta_Dasar_Tile/MapServer/tile/{z}/{y}/{x}',
            name: 'Peta Ops',
          },
          {
            url: 'https://tataruang.jakarta.go.id/server/rest/services/Kawasan_Reklame_Tile/MapServer/tile/{z}/{y}/{x}',
            name: 'Kawasan Reklame',
          },
        ]}
        onClose={() => actions.setmodalLayer(false)}
        title={'Layer List'}
        isVisible={states.modalLayer}
        selectedValue={states.layerList}
        onSelect={(
          value: React.SetStateAction<{ name: string, url: string }>
        ) => actions.setlayerList(value)}
        keyTitle={'item.name'}
      />
      <ModalConfirmation
        title={'Yahh GPS nya mati!'}
        subTitle={'GPS Perlu di hidupkan untuk mengakses fitur ini'}
        isVisible={states.modalSetting}
        onClose={() => actions.onCancelGps()}
        onSuccess={() => actions.onConfirmGps()}
        successText="Aktifkan GPS"
      />
      <ModalBasic
        isVisible={states.isModalDetail}
        onClose={() => actions.setIsModalDetail(false)}
        style={{ padding: spacing.sm }}
        header
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text weight="bold" size="title">
            {states?.selectedMarker?.KONTEN || 'Judul kosong'}
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing.xs }}>
            <Icon name="trash-can-outline" color={COLOR_EVENT_ERROR} />
            <Icon name="pencil-outline" color={COLOR_EVENT_INFORMATION} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLOR_WHITE,
            maxHeight: heightByScreen(75),
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text weight="bold">{states?.selectedMarker?.STRUKTUR} : </Text>
              <Text weight="bold">{states?.selectedMarker?.JENIS}</Text>
            </View>
            <Text type="italic">{states?.selectedMarker?.KODE}</Text>
          </View>
          <Text>
            {states?.selectedMarker?.LOKASI},{states?.selectedMarker?.KEL},
            {states?.selectedMarker?.KEC},{states?.selectedMarker?.WIL}
          </Text>
          {isLoading ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  marginVertical: spacing.sm,
                }}
              >
                <LoadingWraper
                  isLoading={true}
                  style={{ height: 50, width: 50 }}
                />
                <LoadingWraper
                  isLoading={true}
                  style={{ height: 50, width: 50 }}
                />
              </View>
              <LoadingWraper
                isLoading={true}
                randomSize
                style={{
                  height: 10,
                  borderRadius: 10,
                }}
              />
            </>
          ) : (
            <FlashList
              estimatedItemSize={5}
              horizontal
              ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
              data={
                states.detailMarker == null
                  ? []
                  : states.detailMarker?.ATTACHMENT
              }
              renderItem={({ item, index }) => (
                <FastImage
                  key={index}
                  previewAble
                  style={styles.imageDetailReklame}
                  source={{ uri: trimUrlCitata(item.url) }}
                />
              )}
              ListEmptyComponent={
                <Text type="italic" style={{ textAlign: 'center' }}>
                  Tidak ada data attachment
                </Text>
              }
            />
          )}

          {!isLoading && (
            <FlatList
              style={{ marginVertical: 10 }}
              // ItemSeparatorComponent={() => <View style={{ borderWidth: 0.5 }} />}
              data={
                states.detailMarker == null
                  ? []
                  : Object.entries(states.detailMarker)
              }
              renderItem={({ item, index }) => {
                if (
                  item[1] !== null &&
                  item[1] !== '' &&
                  item[0] !== 'ATTACHMENT'
                ) {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: spacing.xs,
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text weight="bold">{toTitleCase(item[0])} : </Text>
                      <Text>{item[1]}</Text>
                    </View>
                  );
                }
              }}
              ListEmptyComponent={
                <Text type="italic" style={{ textAlign: 'center' }}>
                  Tidak ada data nya
                </Text>
              }
            />
          )}
        </View>
      </ModalBasic>

      <ModalRegionSearch
        mapRef={ref}
        header={
          <Header
            left={null}
            title={'Cari Wilayah'}
            right={
              <Button
                style={{ padding: 10 }}
                onPress={() => setisSearchingVisible(!isSearchingVisible)}
              >
                <Icon name="close" />
              </Button>
            }
          />
        }
        isVisible={isSearchingVisible}
        onClose={() => setisSearchingVisible(false)}
      />
    </BaseView>
  );
};

export default Screen;
