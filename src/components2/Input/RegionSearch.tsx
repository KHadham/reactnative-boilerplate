import { View, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { spacing } from '@constants/spacing';
import { useNavigationHandler } from '@utils/navigation';
import { COLOR_BLACK, COLOR_WHITE } from '@themes/index';
import { LayoutAnimationHandler } from '@utils/uiHandler';
import {
  Button,
  Icon,
  Input,
  LoadingWraper,
  Separator,
  Text,
} from '@components';
import { formatBoldSubstring } from '@utils/index';
import LottieView from 'lottie-react-native';
import { animateMapToTargetRegion } from '@utils/location';

interface AppProps {
  mapRef: any;
}

const App: React.FC<AppProps> = ({ mapRef }) => {
  const textInputRef = useRef(null);
  const { navigate, goBack } = useNavigationHandler();
  const [isSearching, setIsSearching] = useState(false);
  const [value, setvalue] = useState('');
  const [Placeholder, setPlaceholder] = useState(
    'Cari jalan, wilayah atau lokasi'
  );
  const [addressList, setaddressList] = useState([]);
  const [historyList, sethistoryList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const searchAddress = txt => {
    let values = encodeURI(txt);
    setisLoading(true);
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${values}&location=-6.1754%2C106.8272&types=geocode&radius=50&key=AIzaSyAHAWEgBz3AN7XVrNOR9P3Rf7unJDjvH9o`,
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

  const getDetailLocation = (location: string) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location}&key=AIzaSyAHAWEgBz3AN7XVrNOR9P3Rf7unJDjvH9o`,
      { method: 'GET' }
    )
      .then(response => response.json())
      .then(obj => {
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
    else {
      setisLoading(true);
      clearTimeout(timeoutId);
      setTimeoutId(
        setTimeout(() => {
          searchAddress(txt);
        }, 1000)
      );
    }
  };

  const onPressItem = (item: any) => {
    try {
      getDetailLocation(item.place_id);
      setvalue('');
      setPlaceholder(item.description);
      console.log('item :>> ', item.description);
      blurTextInput();
      setaddressList([]);
      // onSelect && onSelect(item);
      // onClose();
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

  const blurTextInput = () => {
    if (textInputRef.current) {
      LayoutAnimationHandler();
      setIsSearching(false);
      textInputRef.current.blur();
    }
  };
  const focusing = () => {
    LayoutAnimationHandler();
    setIsSearching(true);
  };

  return (
    <SafeAreaView
      style={[
        {
          position: 'absolute',
          zIndex: 10,
          width: widthByScreen(100),
          // paddingBottom: 0,
          backgroundColor: isSearching
            ? 'rgba(255, 255, 255, 1)'
            : 'rgba(255, 255, 255, 0)',
        },
        isSearching && {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          flex: 1,
          height: heightByScreen(100),
          zIndex: 20,
        },
      ]}
    >
      <Input
        style={{ padding: spacing.md }}
        ref={textInputRef}
        value={value}
        placeholder={Placeholder}
        placeholderTextColor={COLOR_BLACK}
        type="search"
        onFocus={() => focusing()}
        onInteract={txt => typingHandle(txt)}
        left={
          <Icon
            name="chevron-left"
            onPress={() => (isSearching ? blurTextInput() : goBack())}
          />
        }
      />
      {isSearching && (
        <View
          style={{
            backgroundColor: COLOR_WHITE,
            padding: 20,
            paddingTop: 0,
            flex: 1,
          }}
        >
          <LoadingWraper
            style={{ borderRadius: 10, height: 10 }}
            isLoading={isLoading}
          />

          <FlatList
            keyboardShouldPersistTaps="always"
            data={addressList}
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
                <LottieView
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
      )}
    </SafeAreaView>
  );
};

export default App;
