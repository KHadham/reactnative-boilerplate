import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  BackHandler,
  Linking,
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
} from '@components';
import { useNavigationHandler } from '@utils/navigation';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { useHooks } from '@semeterApp/hooks';
import {
  animateMapToTargetRegion,
  gpsEnabler,
  getCurrentLocation,
} from '@utils/location';

const Screen = () => {
  const { getParam } = useNavigationHandler();
  const { data, isLoading, actions, states, ref } = useHooks();

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
            <Icon name="magnify" />
          </Button>
        }
      />
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <MapView
          ref={ref} // Attach the ref to the MapView
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          provider="google"
          initialRegion={{
            // lokasi monas
            latitude: -6.1754,
            longitude: 106.8272,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
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
