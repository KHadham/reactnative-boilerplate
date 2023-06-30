import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  ViewStyle,
} from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components/index';
import { widthByScreen } from '@app/helper/dimensions';
import { spacing } from '@app/constants/spacing';
import { Text, Stepper, AutoImage } from '@app/components';
import {
  handleHorizontalScroll,
  scrollToIndexHorizontal,
} from '@helper/animationUtils';

interface AppProps {
  data: Array<object>;
  indicator?: boolean;
  renderItem: any;
  containerStyle: ViewStyle;
  // props?: TCarouselProps
}
type TCarouselProps = /*unresolved*/ any;

const App: React.FC<AppProps> = ({
  indicator = true,
  renderItem,
  data = [
    {
      image: '',
      title: '',
      desc: '',
    },
  ],
  containerStyle,
}) => {
  const CarouselRef = useRef(null);
  const scrollViewRef = useRef(null);

  const [step, setstep] = useState(1);

  useEffect(() => {
    scrollToIndexHorizontal(step, scrollViewRef);
    // ToastAndroid.show(`step ${step}`, ToastAndroid.SHORT);
  }, [step]);

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
    <View style={containerStyle}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        onMomentumScrollEnd={event =>
          handleHorizontalScroll(event).then(
            (data: React.SetStateAction<number>) => setstep(data)
          )
        }
      >
        {data.map((item, index) => (
          <View key={index} style={{ width: widthByScreen(100) }}>
            {renderItem(item, index)}
          </View>
        ))}
      </ScrollView>
      <Stepper
        containerStyle={{ marginHorizontal: 100 }}
        dataStep={3}
        currentStep={step}
        onPressStep={(index: React.SetStateAction<number>) => setstep(index)}
      />
    </View>
  );
};

export default App;
