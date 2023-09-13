import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-toast-message';
import {
  BaseView,
  Button,
  GpsMarker,
  Header,
  Icon,
  ModalConfirmation,
  ModalList,
  ModalSearch,
  Text,
} from '@components';
import { useNavigationHandler } from '@utils/navigation';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { Marker, UrlTile } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

import { useHooks } from '@semeterApp/hooks';
import {
  animateMapToTargetRegion,
  gpsEnabler,
  getCurrentLocation,
} from '@utils/location';
import { COLOR_BASE_PRIMARY_DARK } from '@themes/index';
import { MARKER } from '@images';
import colors from '@themes/colors';
import { widthByScreen } from '@utils/dimensions';

const Screen = () => {
  const { getParam } = useNavigationHandler();
  const { data, isLoading, actions, states, ref } = useHooks();
  console.log('data :>> ', data.features[0]);

  return (
    <BaseView>
      <Header
        title={'SEMETER'}
        right={
          <Button
            containerStyle={{ padding: 10 }}
            onPress={() =>
              actions.setisSearchingVisible(!states.isSearchingVisible)
            }
          >
            {isLoading ? <ActivityIndicator /> : <Icon name="magnify" />}
          </Button>
        }
      />
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <MapView
          clusterColor={COLOR_BASE_PRIMARY_DARK}
          ref={ref} // Attach the ref to the MapView
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
        >
          {data?.features?.map((item, index) => {
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
              0: colors.orange.orange_50,
              1: colors.bronze.bronze_50,
              2: colors.green.green_50,
              3: colors.purple.purple_50,
              4: colors.sky.sky_50,
              5: colors.blue.blue_50,
              6: colors.dusk.dusk_50,
            };

            const image =
              tindakanToImage[item.attributes.KD_JENIS_TINDAKAN] ||
              MARKER.marker;

            const group = groupToColor[item.attributes.GROUP_BY_ID] || 'red';

            return (
              <Marker
                key={`${index}~${item.geometry.y}`}
                coordinate={{
                  latitude: item.geometry.y,
                  longitude: item.geometry.x,
                }}
                // pinColor={group}
              >
                <View
                  style={{
                    // backgroundColor: group,
                    // borderWidth: 1,
                    // borderColor: group,
                  }}
                >
                  <Image
                    source={image}
                    style={{
                      width: widthByScreen(5),
                      height: widthByScreen(5),
                      tintColor: group,
                      // backgroundColor: group,
                    }}
                  />
                </View>
              </Marker>
            );
            {
              /* <View
                  style={{
                    backgroundColor: group,
                    borderWidth: 1,
                    borderColor: group,
                  }}
                >
                  <Image
                    source={image}
                    style={{
                      width: widthByScreen(5),
                      height: widthByScreen(5),
                      tintColor: group,
                    }}
                  />
                </View>
              </Marker> */
            }
          })}
          <GpsMarker coordinate={states.coordinate} />

          {/* basic */}
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
          iconName="layers-triple-outline"
          position="top-right"
        />
        <Button
          type="fab"
          onPress={() => actions.getLocation()}
          iconName="crosshairs-gps"
          isLoading={isLoading}
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
        onSelect={value => actions.setlayerList(value)}
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
      <ModalSearch
        header={
          <Header
            left={
              <TouchableOpacity
                onPress={() => actions.setisSearchingVisible(false)}
              >
                <Icon name={'chevron-left'} size={30} />
              </TouchableOpacity>
            }
            title={'SEMETER'}
            right={
              <Button
                containerStyle={{ padding: 10 }}
                onPress={() =>
                  actions.setisSearchingVisible(!states.isSearchingVisible)
                }
              >
                <Icon name="close" />
              </Button>
            }
          />
        }
        isVisible={states.isSearchingVisible}
        onClose={() => actions.setisSearchingVisible(false)}
        onSelect={(txt: string) => actions.getDetaillocation(txt)}
      />
    </BaseView>
  );
};

export default Screen;
