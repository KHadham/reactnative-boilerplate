import React, { useState } from 'react';
import { View } from 'react-native';
import { Icon, Text, Input, Separator, Button } from '@components';
import Modal from 'react-native-modal';
import { COLOR_WHITE } from '@themes/index';
import { spacing } from '@constants/spacing';
import { FlashList } from '@shopify/flash-list';
import Lottie from 'lottie-react-native';
import { formatBoldSubstring } from '@utils/index';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { animateMapToTargetRegion } from '@utils/location';

interface AppProps {
  isVisible: boolean;
  onClose?: Function;
  onSelect?: Function;
  header?: React.ReactNode;
  mapRef: any;
}

const App: React.FC<AppProps> = ({
  isVisible = false,
  onClose,
  onSelect,
  header,
  mapRef,
}) => {
  const [value, setvalue] = useState('');
  const [addressList, setaddressList] = useState([]);
  const [historyList, sethistoryList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const searchAddress = () => {
    let values = encodeURI(value);
    setisLoading(true);
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${values}&location=-6.1754%2C106.8272&types=geocode&radius=100&key=AIzaSyAHAWEgBz3AN7XVrNOR9P3Rf7unJDjvH9o`,
      { method: 'GET' }
    )
      .then(response => response.json())
      .then(obj => {
        if (obj?.status == 'ZERO_RESULTS') {
          setaddressList([]);
        } else {
          setaddressList(obj?.predictions);
        }
      })
      .catch(error => {
        console.log('error :>> ', error);
        console.warn(error);
      })
      .finally(() => setisLoading(false));
  };

  const getDetailLocation = (location: string) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location}&key=AIzaSyAHAWEgBz3AN7XVrNOR9P3Rf7unJDjvH9o`,
      { method: 'GET' }
    )
      .then(response => response.json())
      .then(obj => {
        console.log('getDetailLocation geometry:>> ', obj.result.geometry);
        console.log('getDetailLocation viewport:>> ', obj.result.viewport);
        console.log('getDetailLocation address_components:>> ', obj.result.address_components);
        animateMapToTargetRegion({
          ref: mapRef.current,
          latitude: obj.result.geometry.location.lat,
          longitude: obj.result.geometry.location.lng,
        });
      })
      .catch(error => {
        console.log('error :>> ', error);
        console.warn(error);
      })
      .finally(() => {});
  };

  const typingHandle = (txt: string) => {
    setvalue(txt);
    if (txt.length == 0) setaddressList([]);
  };

  const onPressItem = (item: any) => {
    try {
      console.log('item :>> ', item.place_id);
      getDetailLocation(item.place_id);
      onSelect && onSelect(item);
      onClose();
    } catch (error) {
      console.log('error onrpess region:>> ', error);
    }
  };

  const addHistory = item => {
    let tempData = [...historyList];
    tempData.push(item);
    if (tempData.length > 5) {
      tempData.shift();
    }
    sethistoryList(tempData);
  };

  return (
    <Modal
      hardwareAccelerated={true}
      useNativeDriver={true}
      hasBackdrop={false}
      isVisible={isVisible}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      animationIn={'fadeInDown'}
      animationOut={'fadeOutUp'}
    >
      {header}
      <View
        style={{
          backgroundColor: COLOR_WHITE,
          padding: 20,
          paddingTop: 0,
          flex: 1,
        }}
      >
        <Input
          placeholder="Cari tempat"
          value={value}
          onInteract={(txt: string) => typingHandle(txt)}
          onSubmitEditing={() => searchAddress()}
          autoFocus
        />
        <FlashList
          data={addressList}
          estimatedItemSize={10}
          ListHeaderComponent={
            isLoading && (
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                style={{ borderRadius: 10 }}
              />
            )
          }
          renderItem={({ item, index }) => (
            <Button
              key={index}
              style={{ paddingVertical: spacing.md }}
              onPress={() => {
                onPressItem(item);
                addHistory(item);
              }}
            >
              {formatBoldSubstring(item.description, value)}
            </Button>
          )}
          ListFooterComponent={() =>
            historyList.length !== 0 && (
              <View style={{ borderTopWidth: 1, paddingTop: spacing.sm }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text weight="bold" size="regular">
                    Riwayat Pencarian
                  </Text>
                  <Icon name="history" />
                </View>
                {historyList.reverse().map((item, index) => (
                  <Button
                    key={`history-${index}`}
                    style={{ paddingVertical: spacing.md }}
                    onPress={() => onPressItem(item)}
                  >
                    <Text>{item?.description}</Text>
                  </Button>
                ))}
              </View>
            )
          }
          ItemSeparatorComponent={() => <Separator />}
          ListEmptyComponent={
            <View
              style={{
                backgroundColor: COLOR_WHITE,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Lottie
                source={require('@animation/emptyData.json')}
                autoPlay
                loop
                style={{
                  width: 200,
                  height: 200,
                }}
              />
              <Text size="desc" style={{ marginBottom: 40 }}>
                Sesuaikan keyword dengan tempat yang mau di cari
              </Text>
            </View>
          }
        />
      </View>
    </Modal>
  );
};

export default App;
