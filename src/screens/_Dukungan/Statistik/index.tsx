import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';

import { Icon } from '@components';
import {
  Accordion,
  AutoImage,
  BaseView,
  Button,
  Header,
  Spacer,
  Text,
  ModalList,
} from '@components';
import { PieChart } from 'react-native-svg-charts';
import { spacing } from '@constants/spacing';
import { COLOR_BASE_PRIMARY_MAIN, COLOR_GREY } from '@themes/index';
import styles from './styles';
import { scrollToIndex } from '@utils/uiHandler';
import { widthByScreen, isPortrait } from '@utils/dimensions';

const dummyResponse = {
  status: 'success',
  status_code: 200,
  msg: 'success',
  data: {
    meta: {
      title: 'Aplikasi',
      description: 'Tugas Monitoring Per Kategori',
    },
    summary: [
      {
        id: 1,
        name: 'Jaringan',
        value: 123,
        color: '#00FF01',
        icon: 'https://andomus.com/img/logo_partai/1.jpg',
      },
      {
        id: 2,
        name: 'PC dan Laptop',
        value: 456,
        color: '#C70039',
        icon: 'https://andomus.com/img/logo_partai/1.jpg',
      },
      {
        id: 3,
        name: 'Aplikasi',
        value: 789,
        color: '#FFFF00',
        icon: 'https://andomus.com/img/logo_partai/2.jpg',
      },
      {
        id: 4,
        name: 'Server',
        value: 789,
        color: '#acdefe',
        icon: 'https://andomus.com/img/logo_partai/2.jpg',
      },
      {
        id: 5,
        name: 'Database',
        value: 789,
        color: '#Abf',
        icon: 'https://andomus.com/img/logo_partai/2.jpg',
      },
    ],
    statistic: [
      {
        name: 'PKB',
        icon: 'https://andomus.com/img/logo_partai/1.jpg',
        value: 123,
        region: [
          {
            name: 'Bandung',
            value: 91293,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/1122', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
          {
            name: 'Cimahi',
            value: 14423,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/-99', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
          {
            name: 'Garut',
            value: 987,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/-99', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
        ],
      },
      {
        name: 'Gerindra',
        icon: 'https://andomus.com/img/logo_partai/4.jpg',
        value: 123,
        region: [
          {
            name: 'Bandung',
            value: 91293,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/1122', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
          {
            name: 'Cimahi',
            value: 14423,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/-99', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
          {
            name: 'Garut',
            value: 987,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/-99', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
        ],
      },
      {
        name: 'Partai Demokrat',
        icon: 'https://andomus.com/img/logo_partai/5.jpg',
        value: 123,
        region: [
          {
            name: 'Bandung',
            value: 91293,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/1122', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
          {
            name: 'Cimahi',
            value: 14423,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/-99', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
          {
            name: 'Garut',
            value: 987,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/-99', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
        ],
      },
      {
        name: 'Partai PDIP',
        icon: 'https://andomus.com/img/logo_partai/6.jpg',
        value: 123,
        region: [
          {
            name: 'Bandung',
            value: 91293,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/1122', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
          {
            name: 'Cimahi',
            value: 14423,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/-99', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
          {
            name: 'Garut',
            value: 987,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/-99', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
        ],
      },
      {
        name: 'Partai Nasdem',
        icon: 'https://andomus.com/img/logo_partai/7.jpg',
        value: 123,
        region: [
          {
            name: 'Bandung',
            value: 91293,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/1122', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
          {
            name: 'Cimahi',
            value: 14423,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/-99', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
          {
            name: 'Garut',
            value: 987,
            child: {
              name: 'Kecamatan',
              source: '[ROOT_URL]/statistik/rekapitulasi/11/1/-99', // [ID_DAPIL]/[ID_PARTAI]/[ID_KECAMATAN]
            },
          },
        ],
      },
    ],
  },
};

const Screen = () => {
  const flatListRef = useRef(null);

  const [first, setfirst] = useState('');
  const [selectedPartai, setselectedPartai] = useState({ name: '' });
  const [modalPartai, setmodalPartai] = useState(false);

  //   useEffect(() => {
  // Toast.show({
  //   type: 'success',
  //   text1: 'Hello',
  //   text2: 'This is some something 👋'
  // });

  //     return () => {
  //       second;
  //     };
  //   }, []);
  const dataKategori = [
    { name: 'Jaringan', percentage: 10, color: '#C70039' },
    { name: 'PC dan Laptop', percentage: 20, color: '#00FF01' },
    { name: 'Aplikasi', percentage: 30, color: '#404FCD' },
    { name: 'Server', percentage: 40, color: '#FFFF00' },
    { name: 'Database', percentage: 40, color: '#FFFF00' },
  ];

  const dataStatus = [
    { name: ' Belum Dikirim', percentage: 10, color: '#C70039' },
    { name: ' Belum Divalidasi', percentage: 20, color: '#00FF01' },
    { name: ' Sudah DIvalidasi', percentage: 30, color: '#404FCD' },
    { name: ' Ditolak', percentage: 40, color: '#FFFF00' },
  ];

  const pieData = data => {
    return data
      .filter(value => value.percentage > 0)
      .map((value, index) => ({
        value: value.percentage,
        svg: {
          fill: value.color,
          onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
      }));
  };

  return (
    <BaseView>
      <FlatList
        contentContainerStyle={{ padding: spacing.md }}
        ListHeaderComponent={
          <View style={{ flexDirection: isPortrait() ? 'column' : 'row' }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={dummyResponse.data.summary}
                  renderItem={({ item, index }) => (
                    <View style={styles.partaiWrap}>
                      <View style={styles.dot(item.color)} />
                      <View>
                        <Text>{item.name}</Text>
                        <Text size='desc'>{item.value}</Text>
                      </View>
                    </View>
                  )}
                />
                <View style={{ flex: 1, margin: spacing.md }}>
                  <View style={{}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text weight='bold' style={{ margin: spacing.xs }}>
                        Kategori
                      </Text>
                    </View>
                  </View>
                  <PieChart
                    style={{ height: 200 }}
                    data={pieData(dataKategori)}
                  />
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={dummyResponse.data.summary}
                  renderItem={({ item, index }) => (
                    <View style={styles.partaiWrap}>
                      <View style={styles.dot(item.color)} />
                      <View>
                        <Text>{item.name}</Text>
                        <Text size='desc'>{item.value}</Text>
                      </View>
                    </View>
                  )}
                />
                <View style={{ flex: 1, margin: spacing.md }}>
                  <View style={{}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text weight='bold' style={{ margin: spacing.xs }}>
                        Kategori
                      </Text>
                    </View>
                  </View>
                  <PieChart
                    style={{ height: 200 }}
                    data={pieData(dataStatus)}
                  />
                </View>
              </View>
            </View>
          </View>
        }
        data={dummyResponse.data.statistic}
        renderItem={({ item, index }) => <View />}
        ItemSeparatorComponent={() => <Spacer />}
      />
      <ModalList
        selectedValue={selectedPartai}
        isVisible={modalPartai}
        data={dummyResponse.data.statistic}
        onSelect={(
          data: React.SetStateAction<{ name: string }>,
          index: React.SetStateAction<number>
        ) => {
          setmodalPartai(false);
          setselectedPartai(data);
          scrollToIndex(index, flatListRef);
        }}
        onClose={() => setmodalPartai(false)}
        keyTitle={'item.name'}
        keyImage={'item.icon'}
        title="Partai"
        subTitle="Pilih partai yang ingin Anda lihat statistiknya"
      />
    </BaseView>
  );
};

export default Screen;
