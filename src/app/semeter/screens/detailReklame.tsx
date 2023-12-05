import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';

import { Text, LoadingWraper, FastImage, Button } from '@components';

import styles from '@semeterApp/styles';
import { spacing } from '@constants/spacing';
import { toTitleCase, trimUrlCitata } from '@utils/index';
import { FlashList } from '@shopify/flash-list';
import { widthByScreen } from '@utils/dimensions';
import { scrollToIndexHorizontal, shadowGenerator } from '@utils/uiHandler';
import { COLOR_WHITE } from '@themes/index';
import { useHooks as detailReklameHook } from '@semeterApp/hooks/useGetDetailReklame';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

const Screen = ({ id }) => {
  const [activeTab, setactiveTab] = useState('');
  const scrollViewRef = useRef(null);
  const { actions, isLoading, data } = detailReklameHook();

  useEffect(() => {
    actions(id);
  }, []);

  const conditionalRender = () => {
    if (isLoading) {
      return (
        <View
          style={{
            backgroundColor: COLOR_WHITE,
            padding: spacing.md,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              // marginVertical: spacing.sm,
            }}
          >
            <LoadingWraper isLoading={true} style={styles.imageDetailReklame} />
            <LoadingWraper isLoading={true} style={styles.imageDetailReklame} />
            <LoadingWraper isLoading={true} style={styles.imageDetailReklame} />
          </View>
          <View style={{  gap: spacing.sm }}>
            <LoadingWraper
              isLoading={true}
              randomSize
              style={{
                height: 10,
                borderRadius: 10,
              }}
            />
            <LoadingWraper
              isLoading={true}
              randomSize
              style={{
                height: 10,
                borderRadius: 10,
              }}
            />
            <LoadingWraper
              isLoading={true}
              randomSize
              style={{
                height: 10,
                borderRadius: 10,
              }}
            />
            <LoadingWraper
              isLoading={true}
              randomSize
              style={{
                height: 10,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: COLOR_WHITE }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: spacing.md,
              backgroundColor: COLOR_WHITE,
              gap: spacing.xs,
            }}
          >
            <Button
              style={{ flex: 1 }}
              type="outline"
              title="Detail"
              color={activeTab == 'Detail' ? 'success' : 'default'}
              onPress={() => {
                setactiveTab('Detail');
                scrollToIndexHorizontal(1, scrollViewRef);
              }}
            />
            <Button
              style={{ flex: 1 }}
              type="outline"
              title="Penindakan"
              color={activeTab == 'Penindakan' ? 'success' : 'default'}
              onPress={() => {
                setactiveTab('Penindakan');
                scrollToIndexHorizontal(2, scrollViewRef);
              }}
            />
            <Button
              style={{ flex: 1 }}
              type="outline"
              title="Histori"
              color={activeTab == 'Histori' ? 'success' : 'default'}
              onPress={() => {
                setactiveTab('Histori');
                scrollToIndexHorizontal(3, scrollViewRef);
              }}
            />
          </View>
          <ScrollView
            horizontal
            scrollEnabled={false}
            pagingEnabled
            ref={scrollViewRef}
          >
            <FlatList
              style={{
                marginVertical: 10,
                width: widthByScreen(100),
                paddingHorizontal: spacing.md,
              }}
              showsVerticalScrollIndicator={false}
              data={data == null ? [] : Object.entries(data.data_reklame)}
              renderItem={({ item, index }) => {
                const [key, value] = item;
                if (
                  item[1] !== null &&
                  item[1] !== '' &&
                  item[0] !== 'ATTACHMENT'
                ) {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        padding: spacing.xs,
                      }}
                    >
                      <Text weight="bold">{toTitleCase(key)} : </Text>
                      <Text style={{ flex: 1, textAlign: 'right' }}>
                        {value}
                      </Text>
                    </View>
                  );
                }
              }}
              ListEmptyComponent={
                <Text type="italic" style={{ textAlign: 'center' }}>
                  Tidak ada data nya
                </Text>
              }
              ListHeaderComponent={
                <FlashList
                  showsHorizontalScrollIndicator={false}
                  estimatedItemSize={5}
                  horizontal
                  ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
                  data={data.data_reklame.ATTACHMENT}
                  renderItem={({ item, index }) => (
                    <FastImage
                      key={index}
                      previewAble
                      style={styles.imageDetailReklame}
                      source={{ uri: trimUrlCitata(item?.url) }}
                    />
                  )}
                  ListEmptyComponent={
                    <Text type="italic" style={{ textAlign: 'center' }}>
                      Tidak ada data attachment
                    </Text>
                  }
                />
              }
            />
            <FlatList
              style={{
                marginVertical: 10,
                width: widthByScreen(100),
                paddingHorizontal: spacing.md,
              }}
              showsVerticalScrollIndicator={false}
              data={data.data_penindakan}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ borderBottomWidth: 1, padding: spacing.xs }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text weight="bold">
                        {item.JENIS_TINDAKAN || 'Belum ada Tindakan'}
                      </Text>
                      <Text>
                        {item.TGL_TINDAKAN &&
                          dayjs(item.TGL_TINDAKAN).format('DD/MMMM/YYYY')}
                      </Text>
                    </View>
                    <Text>Dibuat oleh: {item.CREATED_BY}</Text>
                    <Text>
                      Catatan tindakan: {item.CAT_TINDAKAN || 'kosong'}
                    </Text>
                  </View>
                );
              }}
              ListEmptyComponent={
                <Text type="italic" style={{ textAlign: 'center' }}>
                  Tidak ada data nya
                </Text>
              }
            />
            <FlatList
              style={{
                marginVertical: 10,
                width: widthByScreen(100),
                paddingHorizontal: spacing.md,
              }}
              showsVerticalScrollIndicator={false}
              data={data.data_histori}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomWidth: 1,
                      padding: spacing.xs,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text weight="bold">Dibuat Oleh: </Text>
                      <Text>{item.CREATED_BY}</Text>
                    </View>
                    <Text>
                      {item.CREATED_AT &&
                        dayjs(item.CREATED_AT).format('DD/MMMM/YYYY')}
                    </Text>
                  </View>
                );
              }}
              ListEmptyComponent={
                <Text type="italic" style={{ textAlign: 'center' }}>
                  Tidak ada data nya
                </Text>
              }
            />
          </ScrollView>
        </View>
      );
    }
  };

  return conditionalRender();
};

export default Screen;
