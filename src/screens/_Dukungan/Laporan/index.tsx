import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';
import { navigate, getParams } from '@utils/navigation';
import Modal from 'react-native-modal';
import { ModalFilter, BaseView, Text, Input, Button } from '@components';
import { spacing } from '@constants/spacing';
import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_EVENT_SUCCESS,
  COLOR_EVENT_WARNING,
  COLOR_GREY,
  COLOR_WHITE,
} from '@themes/index';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

const Screen = () => {
  dayjs.locale('id');
  const params = getParams();

  const [modalFilter, setmodalFilter] = useState(false);
  const [selectedValue, setselectedValue] = useState([]);

  //   useEffect(() => {

  //     return () => {
  //       second;
  //     };
  //   }, []);
  const data = [
    {
      subKategori: 'Database IMB Baru',
      pengecekan: {
        Koneksi: 'Baik',
        Catatan: 'berfungsi',
      },
      status: 'Belum Divalidasi',
      operator: 'MAHARETTA CIPTA UMBARA',
      tanggal: '2023-06-16 09:11:5',
      aksi: ['detail', 'approve'],
    },
    {
      subKategori: 'Sistem Peta informasi',
      pengecekan: {
        Koneksi: 'Baik',
        Catatan: 'berfungsi',
      },
      status: 'Sudah Divalidasi',
      operator: 'Damman',
      tanggal: '2023-06-16 09:11:5',
      aksi: ['detail'],
    },
    {
      subKategori: 'only office server',
      pengecekan: {
        Koneksi: 'Baik',
        Catatan: 'berfungsi',
      },
      status: 'Sudah Divalidasi',
      operator: 'Damman',
      tanggal: '2023-06-16 09:11:5',
      aksi: ['detail'],
    },
  ];

  return (
    <BaseView style={{}}>
      <FlatList
        data={data}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        ListHeaderComponent={() => (
          <Button
            style={{
              padding: spacing.md,
              backgroundColor: COLOR_WHITE,
            }}
            onPress={() => setmodalFilter(true)}
          >
            <Input type="search" value={''} placeholder="Cari nama pendukung" />
          </Button>
        )}
        renderItem={({ item, index }) => (
          <Button
            onPress={() =>
              Toast.show({
                type: 'success',
                text1: 'Hello',
                text2: 'This is some something 👋',
              })
            }
            style={{
              borderRadius: 10,
              padding: spacing.md,
              backgroundColor: COLOR_WHITE,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              margin: spacing.md,
              marginVertical: spacing.xs,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text weight='bold'>{item.subKategori}</Text>

              {item.status == 'Sudah Divalidasi' ? (
                <Icon
                  name={'timeline-text-outline'}
                  size={30}
                  color={COLOR_EVENT_WARNING}
                />
              ) : (
                <Icon
                  name={'timeline-check-outline'}
                  size={30}
                  color={COLOR_EVENT_SUCCESS}
                />
              )}
            </View>
            <Text>
              {dayjs(item.tanggal).format('dddd, DD/MMMM/YYYY')}
            </Text>
            <Text size='desc'>{item.operator}</Text>
          </Button>
        )}
      />
      <ModalFilter
        data={[
          { title: 'Kategori', items: ['database', 'jaringan', 'server'] },
          {
            title: 'SubKategori',
            items: ['database IMB baru', 'Sistem Peta Informasi'],
          },
          { title: 'Status', items: ['belum validasi', 'sudah validasi'] },
          { title: 'Tahun', items: ['2021', '2022', '2023'] },
        ]}
        selectedValue={selectedValue}
        isVisible={modalFilter}
        onFilterChange={(filterData: React.SetStateAction<any>) =>
          setselectedValue(filterData)
        }
        onClose={() => setmodalFilter(false)}
        title="Filter"
        subTitle={''}
        keyTitle={''}
      />
    </BaseView>
  );
};

export default Screen;
