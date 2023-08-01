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
import { onShare, onPressLink } from '@utils/other';
import { spacing } from '@constants/spacing';

const Screen = () => {
  const { pengumumanData } = useHooks();

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
        data={pengumumanData}
        renderItem={({ item, index }) => (
          <Button onPress={() => onPressLink({ url: item.link })}>
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
      />
    </BaseView>
  );
};

export default Screen;
