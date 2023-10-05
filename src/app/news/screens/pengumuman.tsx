import React, { useEffect, useState } from 'react';
import { View, Share } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import {
  Text,
  BaseView,
  FastImage,
  Separator,
  Icon,
  Button,
} from '@components';
import { FlashList } from '@shopify/flash-list';
import { useHooks } from '@newsApp/hooks/usePengumuman';
import { heightByScreen } from '@utils/dimensions';
import { useNavigationHandler } from '@utils/navigation';

import { spacing } from '@constants/spacing';

const Screen = () => {
  const { onShare, onPressLink } = useNavigationHandler();
  const { data, fetching, isLoading } = useHooks();
  const [first, setfirst] = useState('');

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

  return (
    <BaseView>
      <FlashList
        estimatedItemSize={50}
        data={data}
        renderItem={({ item, index }) => (
          <Button onPress={() => onPressLink(item.link)}>
            <View style={{ padding: 20 }}>
              <Text
                size="title"
                weight="bold"
                style={{ marginVertical: spacing.sm }}
              >
                {item.judul_berita.toUpperCase()}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
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
          </Button>
        )}
        ItemSeparatorComponent={() => <Separator />}
        onEndReached={fetching}
        ListFooterComponent={
          <View style={{ padding: 20, gap: spacing.sm }}>
            <Text isLoading style={{ width: '100%' }} />
            <Text isLoading style={{ width: '90%' }} />
            <Text isLoading style={{ width: '100%' }} />
            <Text isLoading size="subTitle" />
          </View>
        }
      />
    </BaseView>
  );
};

export default Screen;
