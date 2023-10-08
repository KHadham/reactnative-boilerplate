import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, RefreshControl } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import { navigate } from '@utils/navigation';
import { BaseView, Accordion, Header, Icon, Text, Button } from '@components';
import { FlashList } from '@shopify/flash-list';
import { useHooks } from '@othersApp/hooks/faq';
import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import { widthByScreen } from '@utils/dimensions';
import { spacing } from '@constants/spacing';
import styles from '@othersApp/styles';
import { COLOR_BASE_PRIMARY_DARK } from '@themes/index';

const App: React.FC = () => {
  const { data, isLoading, fetching } = useHooks();


  return (
    <BaseView>
      <Header
        left={
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Image
              source={IMAGES.iconCitata}
              style={{ height: 50, width: 50, position: 'absolute' }}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </View>
        }
        title="Pertanyaan Umum"
        shadow
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetching} />
        }
        data={data}
        renderItem={({ index, item }) => (
          <Accordion
            isLoading={isLoading}
            style={{ margin: spacing.md }}
            keys={index}
            content={
              <Text size="subTitle" weight="bold">
                {item.kategori}
              </Text>
            }
            contentExpand={
              <FlashList
                estimatedItemSize={20}
                estimatedListSize={{ height: 100, width: widthByScreen(80) }}
                ListEmptyComponent={() => (
                  <View style={styles.itemProdukHukumNull}>
                    <Text size="desc">Tidak ada data</Text>
                    <Icon
                      name="server-network-off"
                      color={COLOR_BASE_PRIMARY_DARK}
                    />
                  </View>
                )}
                data={item.child}
                renderItem={({ index, item }) => (
                  <Accordion
                    style={{ marginTop: spacing.md }}
                    content={
                      <Text weight="bold" size="regular">
                        {item.nama_faq}
                      </Text>
                    }
                    contentExpand={
                      <RenderHtml
                        baseStyle={styles.baseStyleHtml}
                        contentWidth={widthByScreen(100)}
                        source={{ html: item.isi }}
                      />
                    }
                    keys={index}
                  />
                )}
              />
            }
          />
        )}
      />
    </BaseView>
  );
};

export default App;
