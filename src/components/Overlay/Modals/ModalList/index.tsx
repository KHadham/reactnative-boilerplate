import {
  COLOR_EVENT_INACTIVE,
  COLOR_EVENT_SUCCESS,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_WHITE,
} from '@themes/index';
import { BaseView, Input, Icon } from '@components';
import React, { useEffect, useState, memo } from 'react';
import {
  View,
  Animated,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { AutoImage, Button, Spacer, Text } from '@components';
import { LayoutAnimationHandler } from '@utils/uiHandler';

import styles from './styles';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
import Lottie from 'lottie-react-native';
import { spacing } from '@constants/spacing';

interface AppProps {
  title: string;
  subTitle?: string;
  isVisible: boolean;
  onClose: Function;
  data?: Array<object | string>;
  selectedValue: object;
  onSelect?: Function;
  isSearch?: boolean;
  keyTitle: string;
  keyImage?: string;
}

const App: React.FC<AppProps> = ({
  title = 'judul',
  subTitle ,
  isVisible = false,
  onClose,
  data = [],
  selectedValue,
  onSelect,
  isSearch,
  keyTitle = 'item',
  keyImage,
}) => {
  const [searchkey, setsearchKey] = useState('');
  const [listData, setlistData] = useState([]);
  const [animatedValues, setAnimatedValues] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const handleEndReached = () => {
    if (!isLoading && page < totalPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    LayoutAnimationHandler();
    // fetchData();
    setlistData(data);
  }, [data]);

  const searching = (txt: string) => {
    setsearchKey(txt);
    setIsLoading(true);
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        if (txt.length == 0) {
          setlistData(data);
        } else {
          let filterResult = data.filter((item, index) => {
            if (
              keyTitle
                .split('.')
                .reduce((obj, key) => item?.[key])
                ?.toString()
                .toLowerCase()
                .includes(txt.toString().toLowerCase())
            ) {
              return keyTitle
                .split('.')
                .reduce((obj, key) => item?.[key])
                ?.toString()
                .toLowerCase()
                .includes(txt.toString().toLowerCase());
            } else {
              console.log('index removed :>> ', index);
            }
          });
          setlistData(filterResult);
        }
        setIsLoading(false);
      }, 500)
    );
  };

  const ListEmptyComponent = () => (
    <View style={styles.emptyWrap}>
      <View style={{}}>
        <Lottie
          source={require('@animation/emptyData.json')}
          autoPlay
          loop
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
      <Text size="desc" style={{ marginBottom: 40 }}>
        Data yang di cari gak ada
      </Text>
    </View>
  );

  const headerList = () => {
    return (
      <View
        style={{
          backgroundColor: COLOR_WHITE,
          borderTopStartRadius: 12,
          borderTopEndRadius: 12,
        }}
      >
        {/* <View style={{ alignItems: 'center' }}>
          <View style={styles.headerHandle} />
        </View> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text size="title" weight='bold'>Pilih {title}</Text>
          <Icon name={'close'} size={22} onPress={() => onClose()} />
        </View>
        <Text size="desc">{subTitle}</Text>
        {isSearch && (
          <View style={styles.inputWrap}>
            <View style={styles.icon}>
              <Icon name={'magnify'} size={22} />
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                onChangeText={searching}
                value={searchkey}
                placeholder={'Cari sesuatu ...'}
                style={styles.input}
              />
            </View>
            <Ripple style={styles.icon} onPress={() => searching('')}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                searchkey !== '' && <Icon name={'close'} size={22} />
              )}
            </Ripple>
          </View>
        )}
      </View>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      onBackdropPress={() => onClose()}
      onSwipeComplete={() => onClose()}
      swipeDirection={'down'}
    >
      <View style={styles.modalWrap}>
        <FlatList
          stickyHeaderIndices={[0]}
          keyboardShouldPersistTaps="handled"
          data={listData}
          ListHeaderComponent={headerList()}
          ItemSeparatorComponent={() => (
            <View style={{ marginVertical: spacing.xxs }} />
          )}
          renderItem={({ item, index }) => {
            return (
              <Button
                onPress={() => {
                  onSelect(item, index);
                  setTimeout(() => {
                    onClose();
                  }, 300);
                }}
                style={[
                  styles.listWrap,
                  {
                    borderColor:
                      selectedValue.name == item.name
                        ? COLOR_EVENT_SUCCESS
                        : COLOR_EVENT_INACTIVE,
                  },
                ]}
              >
                {keyImage && (
                  <AutoImage
                    source={{
                      uri: keyImage
                        .split('.')
                        .reduce((obj, key) => item?.[key]),
                    }}
                    maxWidth={30}
                  />
                )}
                <Spacer />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text
                    size="desc"
                    style={{
                      fontFamily: 'Inter-Regular',
                      color: COLOR_FONT_PRIMARY_DARK,
                    }}
                  >
                    {keyTitle.split('.').reduce((obj, key) => item?.[key])}
                  </Text>
                </View>
                <View style={styles.icon}>
                  <Icon
                    name={
                      selectedValue.name == item.name
                        ? 'radiobox-marked'
                        : 'radiobox-blank'
                    }
                    size={22}
                    color={selectedValue.name == item.name && COLOR_EVENT_SUCCESS}
                  />
                </View>
              </Button>
            );
          }}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={() => ListEmptyComponent()}
        />
      </View>
    </Modal>
  );
};

export default App;
