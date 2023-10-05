import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import { navigate } from '@utils/navigation';
import { BaseView, Accordion, Header, Icon, Text } from '@components';
import { FlashList } from '@shopify/flash-list';
import { useHooks } from '@othersApp/hooks/faq';
import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import { widthByScreen } from '@utils/dimensions';
import { spacing } from '@constants/spacing';
import styles from '@othersApp/styles';

const App: React.FC = () => {
  const { data, isLoading } = useHooks();

  useEffect(() => {
    console.log('isLoading outer :>> ', isLoading);
    console.log('datassss :>> ', data);
  }, [data]);

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
        title="F.A.Q"
        shadow
      />
      <FlashList
        estimatedItemSize={4}
        data={data}
        renderItem={({ index, item }) => (
          <Accordion
            isLoading={isLoading}
            style={{ margin: spacing.md }}
            keys={index}
            content={(isExpand: boolean) => (
              <View style={styles.acordionContent}>
                <Text size="title" weight="bold">
                  {item.kategori}
                </Text>
                {isExpand && (
                  <FlashList
                    estimatedItemSize={4}
                    data={item.child}
                    renderItem={({ index, item }) => (
                      <Accordion
                        isLoading={isLoading}
                        style={{ marginTop: spacing.md }}
                        keys={index}
                        content={(isExpand: boolean) => (
                          <View style={styles.acordionContent}>
                            <Text
                              size="title"
                              weight="bold"
                              style={{ marginRight: spacing.md }}
                            >
                              {item.nama_faq}
                            </Text>
                            {isExpand && (
                              <RenderHtml
                                baseStyle={styles.baseStyleHtml}
                                contentWidth={widthByScreen(100)}
                                source={{ html: item.isi }}
                              />
                            )}
                          </View>
                        )}
                      />
                    )}
                  />
                )}
              </View>
            )}
          />
        )}
      />
    </BaseView>
  );
};

export default App;
