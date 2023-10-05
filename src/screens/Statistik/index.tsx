import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import Toast from 'react-native-toast-message';

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

const dummyResponse = {
  status: 'success',
  status_code: 200,
  msg: 'success',
  data: {
    meta: {
      title: 'DPR RI - DKI JAKARTA I',
      description:
        'Sumber: KPU - Info Publik Pemilu 2019 Versi 2019-12-18 17:00:04',
    },
    summary: [
      {
        id: 1,
        name: 'PKB',
        value: 123,
        color: '#00FF01',
        icon: 'https://andomus.com/img/logo_partai/1.jpg',
      },
      {
        id: 2,
        name: 'Gerindra',
        value: 456,
        color: '#C70039',
        icon: 'https://andomus.com/img/logo_partai/1.jpg',
      },
      {
        id: 3,
        name: 'Golkar',
        value: 789,
        color: '#FFFF00',
        icon: 'https://andomus.com/img/logo_partai/2.jpg',
      },
      {
        id: 4,
        name: 'Partai Demokrat',
        value: 789,
        color: '#acdefe',
        icon: 'https://andomus.com/img/logo_partai/2.jpg',
      },
      {
        id: 5,
        name: 'Partai PDIP',
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
  const dataChartPartai = [
    { name: 'Gerindra', percentage: 10, color: '#C70039' },
    { name: 'PKB', percentage: 20, color: '#00FF01' },
    { name: 'Perindo', percentage: 30, color: '#404FCD' },
    { name: 'Golkar', percentage: 40, color: '#FFFF00' },
    { name: 'PDIP', percentage: 10, color: '#FE0000' },
  ];

  const pieData = dataChartPartai
    .filter(value => value.percentage > 0)
    .map((value, index) => ({
      value: value.percentage,
      svg: {
        fill: value.color,
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }));

  const decimalToPercentage = (data, value) => {
    return (
      (value / data.reduce((sum, item) => sum + item.value, 0)) *
      100
    ).toFixed(2);
  };

  return (
    <BaseView headerComponent={<Header title="Statistik Dukungan"  />}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderTopWidth: 0.5,
          borderColor: COLOR_GREY,
        }}
      >
        <FlatList
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={dummyResponse.data.summary}
          ListHeaderComponent={<View style={{ margin: spacing.xs }} />}
          renderItem={({ item, index }) => (
            <View
              style={{
                justifyContent: 'center',
                borderColor: COLOR_BASE_PRIMARY_MAIN,
                borderBottomWidth: selectedPartai?.name == item.name ? 1 : 0,
              }}
            >
              {selectedPartai?.name == item.name ? (
                <Text weight='bold'
                  style={{
                    margin: spacing.xxs,
                    textShadowColor: item.color,
                    textShadowOffset: { width: -1, height: 0 },
                    textShadowRadius: 1,
                  }}
                >
                  {item.name}{' '}
                  {decimalToPercentage(dummyResponse.data.summary, item.value)}
                </Text>
              ) : (
                <Text size='desc'
                  style={{
                    margin: spacing.xxs,
                    textShadowColor: item.color,
                    textShadowOffset: { width: -1, height: 0 },
                    textShadowRadius: 1,
                  }}
                >
                  {item.name}{' '}
                  {decimalToPercentage(dummyResponse.data.summary, item.value)}
                </Text>
              )}
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.menu}
          onPress={() => {
            // setmodalPartai(!modalPartai);
            Toast.show({
              type: 'success',
              text1: 'Hello',
            });
          }}
        >
          <Icon name={'menu'} size={26} color={COLOR_BASE_PRIMARY_MAIN} />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{ padding: spacing.md }}
        ListHeaderComponent={
          <>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text weight='bold' style={{}}>
                  {dummyResponse.data.meta.title}
                </Text>
              </View>
              <Text style={{}}>
                Grafik rekapitulasi pemilu DPR RI per partai
              </Text>
            </View>
            <View style={{ margin: spacing.md }}>
              <PieChart style={{ height: 200 }} data={pieData} />
              <Text style={{ textAlign: 'center', marginTop: spacing.sm }}>
                {dummyResponse.data.meta.description}
              </Text>
            </View>
            <Text weight='bold'>Rincian Hasil Suara</Text>
            <Text>Rekapitulasi suara pemilu DPRI RI per partai</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={dummyResponse.data.summary}
              renderItem={({ item, index }) => (
                <View style={styles.partaiWrap}>
                  <View style={styles.dot(item.color)} />
                  <View>
                    <Text size='desc'>{item.name}</Text>
                    <Text weight='bold'>{item.value}</Text>
                  </View>
                </View>
              )}
            />
          </>
        }
        data={dummyResponse.data.statistic}
        renderItem={({ item, index }) => (
          <Accordion
            keys={index}
            content={(isExpand: boolean) => {
              return (
                <>
                  <View style={styles.listItemWrap}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}
                    >
                      <View style={{ justifyContent: 'center' }}>
                        <AutoImage source={{ uri: item.icon }} maxWidth={30} />
                      </View>
                      <Spacer />
                      <View style={{ justifyContent: 'center' }}>
                        <Text weight='bold'>{item.name}</Text>
                        {isExpand && (
                          <>
                            <Text>Perolehan {item.value} suara</Text>
                            <TouchableOpacity onPress={() => alert('asdas')}>
                              <Text color={COLOR_BASE_PRIMARY_MAIN}>
                                Statistik Partai
                              </Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    </View>
                  </View>
                  {isExpand && (
                    <FlatList
                      data={item.region}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          onPress={() => {}}
                          style={styles.childlistItemWrap}
                        >
                          <Text weight='bold' color={COLOR_BASE_PRIMARY_MAIN}>
                            {item.name}
                          </Text>
                          <Text size='desc' style={{}}>{item.value} suara</Text>
                        </TouchableOpacity>
                      )}
                      ItemSeparatorComponent={() => (
                        <View
                          style={{
                            borderWidth: 0.5,
                            borderColor: COLOR_GREY,
                          }}
                        />
                      )}
                      ListFooterComponent={
                        <Button
                          title="Lihat Rekapitulasi"
                          type="outline"
                          style={{ margin: spacing.sm }}
                        />
                      }
                    />
                  )}
                </>
              );
            }}
          />
        )}
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
