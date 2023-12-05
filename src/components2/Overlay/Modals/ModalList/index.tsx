import {
  COLOR_BORDER,
  COLOR_EVENT_INACTIVE,
  COLOR_EVENT_SUCCESS,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_WHITE,
} from '@themes/index';
import { BaseView, Input, Icon, HeaderModal } from '@components';
import React, { useEffect, useState, memo } from 'react';
import {
  View,
  Animated,
  FlatList,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { AutoImage, Button, Spacer, Text } from '@components';
import { LayoutAnimationHandler } from '@utils/uiHandler';

import styles from './styles';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
import Lottie from 'lottie-react-native';
import { spacing } from '@constants/spacing';
import axios from 'axios';
import { handleRequest } from '@utils/networking';
import { toTitleCase } from '@utils/index';
import { heightByScreen } from '@utils/dimensions';

interface AppProps {
  title: string;
  subTitle?: string;
  isVisible: boolean;
  onClose: Function;
  data?:
  | Array<{
    value: string,
    label: string,
  }>
  | string;
  selectedValue:
  | Array<{
    value: string,
    label: string,
  }>
  // | {
  //     value: string,
  //     label: string,
  //   };
  onSelect?: Function;
  isSearch?: boolean;
  type?: 'check' | 'radio';
}

const App: React.FC<AppProps> = ({
  title = 'judul',
  subTitle,
  isVisible = false,
  onClose,
  data = [],
  selectedValue = [],
  onSelect,
  isSearch,
  type,
}) => {
  const [searchkey, setsearchKey] = useState('');
  const [originData, setoriginData] = useState([]);
  const [listData, setlistData] = useState([]);
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
    getList();
  }, [data]);

  const getList = () => {
    if (typeof data == 'string') {
      handleRequest({
        method: 'GET',
        path: data,
      })
        .then(res => {
          setlistData(res.data.data);
          setoriginData(res.data.data);
        })
        .catch(err => console.log('errult :>> ', err));
    } else {
      setlistData(data);
      setoriginData(data);
    }
  };

  const searching = (txt: string) => {
    setsearchKey(txt);
    setIsLoading(true);
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        LayoutAnimationHandler();
        if (txt.length == 0) {
          setlistData(originData);
        } else {
          let filterResult = originData.filter((item, index) => {
            const itemString = item?.label?.toString().toLowerCase();
            const txtString = txt.toString().toLowerCase();
            if (itemString.includes(txtString)) {
              return true;
            }
            return false;
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
        Data nya gak ada
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
        <Text size="subTitle" weight="bold">
          Pilih {title}
        </Text>
        <Text size="desc">{subTitle}</Text>
        {isSearch && (
          <Input
            type="search"
            value={searchkey}
            placeholder={`Cari ${title}`}
            onInteract={searching}
          />
        )}
      </View>
    );
  };

  const onPressList = (item, index) => {
    if (type == 'check') {
      const itemIndex = selectedValue.findIndex((selectedItem) => selectedItem.value === item.value);
      let updatedSelectedItems = selectedValue.slice();
      if (itemIndex !== -1) {
        updatedSelectedItems.splice(itemIndex, 1);
      } else {
        updatedSelectedItems.push(item);
      }
      onSelect(updatedSelectedItems)
    } else {
      setsearchKey('');
      onSelect(item);
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  return (
    <Modal
      onBackButtonPress={() => onClose()}
      onBackdropPress={() => onClose()}
      hardwareAccelerated
      isVisible={isVisible}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      hideModalContentWhileAnimating
      useNativeDriver
    >
      <SafeAreaView
        style={{
          backgroundColor: COLOR_WHITE,
          maxHeight: heightByScreen(90), 
        }}
      >
        <HeaderModal />
        <View
          style={{
            padding: spacing.md,
            width: '100%',
            backgroundColor: COLOR_WHITE, 
            maxHeight: heightByScreen(85), 
          }}
        >
          {headerList()}
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              width: '100%',
              backgroundColor: COLOR_WHITE,
            }}
            keyboardShouldPersistTaps="handled"
            data={listData}
            ItemSeparatorComponent={() => (
              <View style={{ marginVertical: spacing.xxs }} />
            )}
            renderItem={({ item, index }) => {
              const isSelected = Array.isArray(selectedValue) ? selectedValue?.some(
                (selectedItem) => selectedItem?.value === item?.value 
              ):false
              const itemBorderColor = isSelected ? COLOR_EVENT_SUCCESS : COLOR_BORDER;
              const iconName = type === 'radio' ? (isSelected ? 'radiobox-marked' : 'radiobox-blank') : (isSelected ? 'checkbox-marked-outline' : 'checkbox-blank-outline');

              return (
                <Button key={index}
                  onPress={() => onPressList(item, index)}
                  style={[
                    styles.listWrap,
                    {borderColor: itemBorderColor},
                  ]}
                >
                  <Text size="desc" weight="bold">
                    {item.label}
                  </Text>
                  <View style={styles.icon}>
                    <Icon
                      name={iconName}
                      size={22}
                      color={itemBorderColor}
                    />
                  </View>
                </Button>
              );
            }}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={() => ListEmptyComponent()}
          />
          <Button
            style={{ width: '100%', marginVertical: spacing.xs }}
            title={'Simpan'}
            onPress={() => {
              onClose();
            }}
          />
        </View>

      </SafeAreaView>
    </Modal>
  );
};

export default App;
