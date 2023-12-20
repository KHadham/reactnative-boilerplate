import React, { useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import {
  BaseView,
  Button,
  GpsMarker,
  Header,
  Icon,
  ModalRegionSearch,
  Text,
  ButtonModalSelection,
  ButtonGps,
  ReklameMarker,
} from '@components';
import MapView from 'react-native-map-clustering';
import { Marker, UrlTile } from 'react-native-maps';

import { isColorDark } from '@utils/uiHandler';
import { useNavigationHandler } from '@utils/navigation';
import { widthByScreen } from '@utils/dimensions';
import { COLOR_FONT_PRIMARY_DARK, COLOR_WHITE } from '@themes/index';

import styles from '@semeterApp/styles';
import { useHooks } from '@semeterApp/hooks/useGetMarkers';
import DetailReklame from '@semeterApp/screens/detailReklame';
import { useHooks as detailReklameHook } from '@semeterApp/hooks/useGetDetailReklame';

const Screen = () => {
  const { navigate } = useNavigationHandler();
  const { actions } = detailReklameHook();
  const { data, isLoading, ref } = useHooks();
  const [isSearchingVisible, setisSearchingVisible] = useState(false);
  const [coordinate, setcoordinate] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [selectedLayer, setselectedLayer] = useState({
    name: '',
    url: '',
  });
  const [region, setregion] = useState({
    latitude: -6.1754,
    longitude: 106.8272,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });

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

  return (
    <BaseView>
      <Header
        title={`SEMETER`}
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
        {!isSearchingVisible && (
          <MapView
          provider={'google'}

            // tracksViewChanges={false}
            // radius={70}
            ref={ref}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            provider={Platform.OS == 'android' ? 'google' : null}
            initialRegion={region}
            onRegionChangeComplete={data => {
              setregion(data);
            }}
            showsUserLocation
            showsMyLocationButton={false}
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
                      backgroundColor: getPointCountColor(
                        properties?.point_count
                      ),
                      borderWidth: 0.5,
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
              return (
                <ReklameMarker
                  coordinate={{
                    latitude: item.geometry.y,
                    longitude: item.geometry.x,
                  }}
                  index={index}
                  item={item}
                  key={index}
                  detailScreen={
                    <DetailReklame
                      id={item.attributes.REKLAME_ID}
                      // data={dataReklame}
                    />
                  }
                  // onPress={(id: number) => actions(id)}
                />
              );
            })}
            <UrlTile
              urlTemplate={selectedLayer.url}
              flipY={false}
              tileSize={256}
            />
          </MapView>
        )}
        {/* <View style={styles.fabTopWrap}>
          <ButtonGps mapRef={ref} onPress={() => {}} />
        </View> */}
        <View style={styles.fabWrap}>
          <ButtonGps
            mapRef={ref}
            onPress={(
              data: React.SetStateAction<{
                latitude: number,
                longitude: number,
              }>
            ) =>
              navigate({
                parent: 'Semeter',
                screen: 'TambahReklame',
                params: { data },
              })
            }
          />
          <ButtonModalSelection
            selectedValue={selectedLayer}
            onSelect={(
              layer: React.SetStateAction<{ name: string, url: string }>
            ) => setselectedLayer(layer)}
          />
        </View>
      </View>

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
