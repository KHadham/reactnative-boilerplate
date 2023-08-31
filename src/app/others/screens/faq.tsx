import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import { navigate } from '@utils/navigation';
import { BaseView, Accordion, Header, Icon, Text } from '@components';
import { FlashList } from '@shopify/flash-list';
import { useHooks } from '@othersApp/hooks';
import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import { widthByScreen } from '@utils/dimensions';
import { spacing } from '@constants/spacing';
import { COLOR_FONT_PRIMARY_DARK, FONT_SIZE_SUBTITLE } from '@themes/index';

const App: React.FC = () => {
  const { data } = useHooks();
  const [first, setfirst] = useState('');

  console.log('data xxx :>> ', data);
  return (
    <BaseView style={{}}>
      <Header left={IMAGES.iconCitata} title="F.A.Q" shadow />
      <FlashList
        estimatedItemSize={4}
        data={data}
        renderItem={({ index, item }) => (
          <View style={{ padding: 20, paddingVertical: 10 }}>
            <Accordion
              keys={index}
              content={(isExpand: boolean) => (
                <View style={{ padding: 20, gap: 10 }}>
                  <Text size="title" weight="bold">
                    {item.kategori}
                  </Text>
                  {isExpand && (
                    <FlashList
                      estimatedItemSize={4}
                      data={item.child}
                      renderItem={({ index, item }) => (
                        <Accordion
                          style={{
                            padding: spacing.md,
                            marginVertical: spacing.md,
                          }}
                          keys={index}
                          content={(isExpand: boolean) => (
                            <View style={{}}>
                              <Text
                                size="title"
                                weight="bold"
                                style={{ marginRight: spacing.md }}
                              >
                                {item.nama_faq}
                              </Text>
                              {isExpand && (
                                <RenderHtml
                                  baseStyle={{
                                    fontFamily: 'Inter-Regular',
                                    color: COLOR_FONT_PRIMARY_DARK,
                                    fontSize: FONT_SIZE_SUBTITLE,
                                  }}
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
          </View>
        )}
      />
    </BaseView>
  );
};

export default App;
