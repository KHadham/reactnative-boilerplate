import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_EVENT_INACTIVE,
  COLOR_EVENT_SUCCESS,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_GREY,
  COLOR_WHITE,
} from '@themes/index';
import { BaseView, Input, Button, Text, Icon } from '@components';
import React, { useEffect, useState, memo } from 'react';
import {
  View,
  Animated,
  FlatList,
  TextInput,
  ActivityIndicator,
  SectionList,
} from 'react-native';

import styles from './styles';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
import Lottie from 'lottie-react-native';
import { spacing } from '@constants/spacing';

interface Item {
  title: string;
  items: string[];
}

interface AppProps {
  title: string;
  subTitle?: string;
  isVisible: boolean;
  onClose?: Function;
  data?: Item[];
  selectedValue: Array<object>;
  onSelect?: Function;
  isSearch?: boolean;
  keyTitle?: string;
  keyImage?: string;
  onFilterChange: Function;
}

const App: React.FC<AppProps> = ({
  title = 'judul',
  subTitle = 'judul',
  isVisible = false,
  onClose,
  // data = [{ title: '', item: [''] }],
  data = [{ title: '', items: [''] }],
  selectedValue,
  onSelect,
  isSearch,
  keyTitle = 'item',
  keyImage,
  onFilterChange = () => {},
}) => {
  const [searchkey, setsearchKey] = useState('');
  const [listData, setlistData] = useState([]);
  const [selectedData, setselectedData] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const handleEndReached = () => {
    if (!isLoading && page < totalPages) {
      setPage(page + 1);
    }
  };

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
      <Text size='desc' style={{ marginBottom: 40 }}>
        Data yang di cari gak ada
      </Text>
    </View>
  );

  const isItemSelected = (item: Item, itemText: string): boolean => {
    const selectedItem = selectedData.find(
      selectedItem => selectedItem.title === item.title
    );
    return selectedItem && selectedItem.items.includes(itemText);
  };

  const filtering = (title, item) => {
    const updatedListData = [...selectedData];
    // Check if the selectedData already contains an entry with the given title
    const existingEntryIndex = updatedListData.findIndex(
      entry => entry.title === title
    );

    if (existingEntryIndex !== -1) {
      // If the entry exists, remove the item if it is present
      const existingItems = updatedListData[existingEntryIndex].items;
      const itemIndex = existingItems.indexOf(item);

      if (itemIndex !== -1) {
        existingItems.splice(itemIndex, 1);

        // If all items have been removed, remove the entire entry
        if (existingItems.length === 0) {
          updatedListData.splice(existingEntryIndex, 1);
        }
      } else {
        // Item not found, so add it to the existing entry
        existingItems.push(item);
      }
    } else {
      // If the entry does not exist, create a new entry
      updatedListData.push({ title, items: [item] });
    }
    setselectedData(updatedListData);
  };

  const renderItem = ({ item, index }: { item: Item, index: number }) => {
    return (
      <View key={`keys${index}`} style={{ marginBottom: spacing.md }}>
        <Text style={{ marginBottom: spacing.xxs }}>
          {item.title}
        </Text>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginHorizontal: -spacing.xxs,
          }}
        >
          {item.items.map((itemx, indexx) => (
            <Button
              key={`keys${indexx}`}
              onPress={() => filtering(item.title, itemx)}
              // isSelected={someFunction(x)}
              style={[
                {
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: spacing.sm,
                  margin: spacing.xxs,
                },
                isItemSelected(item, itemx)
                  ? { borderColor: COLOR_EVENT_SUCCESS }
                  : { borderColor: COLOR_GREY },
              ]}
            >
              <Text size='desc'>{itemx}</Text>
            </Button>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      swipeDirection={'down'}
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      onSwipeComplete={() => onClose()}
    >
      <BaseView
        style={{
          backgroundColor: COLOR_WHITE,
          padding: spacing.md,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            marginTop: -spacing.sm,
          }}
        >
          <View style={styles.headerHandle} />
        </View>
        <FlatList
          ListEmptyComponent={ListEmptyComponent}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: COLOR_WHITE,
              }}
            >
              <Text size='title' style={{ marginBottom: spacing.md }}>
                {title}
              </Text>
              <Icon
                name={'backup-restore'}
                size={30}
                color={COLOR_BASE_PRIMARY_MAIN}
                onPress={() => {
                  setselectedData([]);
                }}
              />
            </View>
          )}
          data={data}
          renderItem={renderItem}
        />
        <Button
          title="Terapkan Filter"
          style={{ marginTop: spacing.md }}
          onPress={() => {
            onFilterChange(selectedData);
            onClose();
          }}
        />
      </BaseView>
    </Modal>
  );
};

export default App;
