import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';

import { Icon } from '@components/index';
import {
  Accordion,
  AutoImage,
  BaseView,
  Button,
  Header,
  Spacer,
  Text,
  ModalList,
  Input,
} from '@app/components';
import { PieChart } from 'react-native-svg-charts';
import { spacing } from '@app/constants/spacing';
import { COLOR_BASE_PRIMARY_MAIN, COLOR_GREY } from '@app/styles';
import styles from './styles';
import { scrollToIndex } from '@helper/animationUtils';
import { widthByScreen } from '@app/helper/dimensions';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const Screen = () => {
  const flatListRef = useRef(null);

  const [first, setfirst] = useState('');
  const [selectedPartai, setselectedPartai] = useState({ name: '' });
  const [modalPartai, setmodalPartai] = useState(false);

  const showtoast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
      position:'bottom'
    });
  };
  return (
    <BaseView>
      <View style={{ padding: spacing.md, paddingTop: spacing.xs }}>
        <Input type="search" value={''} placeholder="Cari nama pendukung" />
        <Text.Desc>Terdapat 123.201 Dukungan</Text.Desc>
      </View>
      <FlatList
        data={[
          {
            name: 'PKB',
            icon: 'https://andomus.com/img/logo_partai/1.jpg',
            value: 123,
          },
          {
            name: 'Golkar',
            icon: 'https://andomus.com/img/logo_partai/2.jpg',
            value: 123,
          },
          {
            name: 'PDIP',
            icon: 'https://andomus.com/img/logo_partai/3.jpg',
            value: 123,
          },
          {
            name: 'PDIP',
            icon: 'asdas',
            value: 123,
          },
        ]}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.listItemWrap}
            onPress={() => showtoast()}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <View style={{ justifyContent: 'center', borderRadius: 100 }}>
                <AutoImage
                  source={{ uri: item.icon }}
                  maxWidth={40}
                  style={{ borderRadius: 100, borderWidth: 1 }}
                />
              </View>
              <Spacer />
              <View style={{ justifyContent: 'center' }}>
                <Text.Title>{item.name}</Text.Title>
                <Text.Desc>{item.name}</Text.Desc>
              </View>
            </View>
            <Icon
              name={'chevron-right'}
              size={30}
              color={COLOR_BASE_PRIMARY_MAIN}
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Spacer line size="flex" />}
      />
    </BaseView>
  );
};

export default Screen;
