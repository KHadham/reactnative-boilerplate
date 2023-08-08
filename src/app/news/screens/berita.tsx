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
import { navigate, getParams } from '@utils/navigation';
import { FlashList } from '@shopify/flash-list';
import { useHooks } from '@newsApp/hooks/useBerita';
import { heightByScreen } from '@utils/dimensions';
import { onShare, onPressLink } from '@utils/other';
import { spacing } from '@constants/spacing';
import ImageView from 'react-native-image-viewing';

const Screen = () => {
  const { beritaData } = useHooks();
  const params = getParams();

  const [previewUri, setpreviewUri] = useState('');

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
        data={beritaData}
        renderItem={({ item, index }) => (
          <View style={{ padding: 20 }}>
            <FastImage
              isLoading
              previewAble={true}
              source={item.img}
              style={{
                width: '100%',
                height: heightByScreen(20),
                borderRadius: 20,
              }}
            />
            <Text
              isLoading
              onPress={() => onPressLink({ url: item.link })}
              size="title"
              weight="bold"
              style={{ marginVertical: spacing.sm }}
            >
              {item.judul_berita.toUpperCase()}
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text isLoading size="subTitle">
                {item.tanggal_upload}
              </Text>
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
