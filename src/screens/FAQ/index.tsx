import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import { navigate } from '@utils/navigation';
import { BaseView, Accordion, Header, Icon, Text } from '@components';
import { FlashList } from '@shopify/flash-list';

const App: React.FC = () => {
  const [first, setfirst] = useState('');

  return (
    <BaseView style={{}}>
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
        data={[1, 2, 3, 4, 5]}
        renderItem={({ index }) => (
          <View style={{ padding: 20, paddingVertical: 10 }}>
            <Accordion
              keys={index}
              content={(isExpand: boolean) => (
                <View style={{ padding: 20 }}>
                  <Text size="subTitle" weight="bold">
                    What is lorem ipsum mean ?
                  </Text>
                  {isExpand && (
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipisici elit…’
                      (complete text) is dummy text that is not meant to mean
                      anything. It is used as a placeholder in magazine layouts,
                      for example, in order to give an impression of the
                      finished document. The text is intentionally
                      unintelligible so that the viewer is not distracted by the
                      content. The language is not real Latin and even the first
                      word ‘Lorem’ does not exist. It is said that the lorem
                      ipsum text has been common among typesetters since the
                      16th century.{' '}
                    </Text>
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
