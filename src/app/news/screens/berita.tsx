import React, { useEffect, useState } from 'react';
import { View, RefreshControl } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import {
  Text,
  BaseView,
  FastImage,
  Separator,
  Icon,
} from '@components';
import { navigate, getParams } from '@utils/navigation';
import { FlashList } from '@shopify/flash-list';
import { useHooks } from '@newsApp/hooks/useBerita';
import { heightByScreen } from '@utils/dimensions';
import { useNavigationHandler } from '@utils/navigation';

import { spacing } from '@constants/spacing';
import ImageView from 'react-native-image-viewing';

const Screen = () => {
  const { onShare, onPressLink } = useNavigationHandler();
  const { data, fetching, isLoading } = useHooks();
  const [previewUri, setpreviewUri] = useState('');

  return (
    <BaseView>
      <FlashList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetching} />
        }
        estimatedItemSize={50}
        data={data}
        renderItem={({ item, index }) => (
          <View style={{ padding: 20 }}>
            <FastImage
              previewAble={true}
              source={{ uri: item.img }}
              style={{
                width: '100%',
                height: heightByScreen(20),
                borderRadius: 20,
              }}
            />
            <Text
              onPress={() => onPressLink(item.link)}
              size="title"
              weight="bold"
              style={{ marginVertical: spacing.sm }}
              numberOfLines={2}
              lineBreakMode="tail"
            >
              {item.judul_berita.toUpperCase()}
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text size="subTitle">{item.tanggal_upload}</Text>
              <Icon
                onPress={() =>
                  onShare({
                    title: item.judul_berita,
                    message: item.link,
                    url: item.link,
                  })
                }
                name={'share-variant-outline'}
              />
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <Separator />}
        onEndReached={fetching}
        ListEmptyComponent={
          !isLoading && <View style={{ alignItems: 'center', borderWidth: 1, flex: 2 }}>
            <Text size="header" weight="thin" type={['italic', 'underline']}>
              Tidak ada data
            </Text>
          </View>
        }
        ListFooterComponent={
          isLoading && <View style={{ padding: 20, gap: spacing.sm, }}>
            <FastImage
              isLoading={true}
              source={''}
              style={{
                width: '100%',
                height: heightByScreen(20),
                borderRadius: 20,
              }}
            />
            <Text isLoading style={{ width: '100%' }} />
            <Text isLoading style={{ width: '100%' }} />
            <Text isLoading size="subTitle" />
          </View>
        }
      />
      <ImageView
        images={[{ uri: previewUri }]}
        imageIndex={0}
        visible={previewUri !== ''}
        onRequestClose={() => setpreviewUri('')}
      />
    </BaseView>
  );
};

export default Screen;
