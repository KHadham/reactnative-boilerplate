import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon, Text, Input, Separator, Button } from '@components';
import Modal from 'react-native-modal';
import {
  COLOR_BASE_PRIMARY_DARK,
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_WHITE,
} from '@themes/index';
import { spacing } from '@constants/spacing';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import Lottie from 'lottie-react-native';
import { formatBoldSubstring } from '@utils/index';
import LottieView from 'lottie-react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

interface AppProps {
  isVisible: boolean;
  onClose?: Function;
  onSelect: Function;
  header?: React.ReactNode;
}

const gecoding_url =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json?&location=-6.1754%2C106.8272&&types=geocode&radius=100&input=';
// 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input= dep&location=-6.1754%2C106.8272&types=geocode&radius=100&key=AIzaSyAHAWEgBz3AN7XVrNOR9P3Rf7unJDjvH9o'

const App: React.FC<AppProps> = ({
  isVisible = false,
  onClose,
  onSelect,
  header,
}) => {
  const [value, setvalue] = useState('');
  const [addressList, setaddressList] = useState([]);
  const [historyList, sethistoryList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  // data={[
  //   { title: 'Struktur', items: ['Dinding', 'JPO', 'Tiang'] },
  //   {
  //     title: 'Resiko',
  //     items: ['Semua', 'Berbahaya', 'Tidak Berbahaya'],
  //   },
  //   {
  //     title: 'Jenis Reklame',
  //     items: [
  //       'Led/VideoTron',
  //       'Papan/Billboard',
  //       'Pengenal Perusahaan',
  //       'Stiker',
  //     ],
  //   },
  // ]}

  const searchAddress = () => {
    let values = encodeURI(value);
    setisLoading(true);
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${values}&location=-6.1754%2C106.8272&types=geocode&radius=100&key=AIzaSyAHAWEgBz3AN7XVrNOR9P3Rf7unJDjvH9o`,
      { method: 'GET' }
    )
      .then(response => response.json())
      .then(obj => {
        console.log('obj :>> ', obj);
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

  const typingHandle = (txt: string) => {
    setvalue(txt);
    if (txt.length == 0) setaddressList([]);
  };

  const onPressItem = (item: { place_id: any }) => {
    addHistory(item);
    onSelect(item.place_id);
    onClose();
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
      isVisible={isVisible}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      onBackdropPress={() => onClose()}
      onSwipeComplete={() => onClose()}
      animationIn={'fadeInDown'}
      animationOut={'fadeOutUp'}
      scrollOffset={1}
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
              containerStyle={{ paddingVertical: spacing.md }}
              onPress={() => onPressItem(item)}
            >
              {formatBoldSubstring(item.description, value)}
            </Button>
          )}
          ListFooterComponent={() =>
            historyList.length !== 0 && (
              <View style={{ borderTopWidth: 1, paddingTop: spacing.sm }}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <Text weight="bold" size='regular'>Riwayat Pencarian</Text>
                  <Icon name='history'/>
                </View>
                {historyList.reverse().map((item,index) => (
                  <Button
                    containerStyle={{ paddingVertical: spacing.md }}
                    onPress={() => {
                      onSelect(item.place_id);
                      onClose();
                    }}
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
