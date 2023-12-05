import React, { useEffect, useRef, useState } from 'react';

import { Button, Icon } from '@components';
import { Text, Stepper, AutoImage } from '@components';
import Carousel, { TCarouselProps } from 'react-native-reanimated-carousel';
import ImageView from 'react-native-image-viewing';
import { View } from 'react-native';
import { COLOR_WHITE } from '@themes/index';

interface AppProps {
  indicator?: boolean;
  previewAble?: boolean;
}

type CombinedProps = AppProps & TCarouselProps;
const App: React.FC<CombinedProps> = ({
  indicator = false,
  previewAble,
  autoPlay = false,
  ...props
}) => {
  const carouselRef = useRef(null);
  const [step, setstep] = useState(0);
  const [isVisible, setisVisible] = useState(false);
  

  const footer = () => (
    <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
      <Stepper
        color={COLOR_WHITE}
        dataStep={props.data?.length}
        currentStep={step + 1}
        onPressStep={(id: number) =>
          carouselRef.current.scrollTo({ index: id - 1, animated: true })
        }
      />
    </View>
  );

  const previewModal = () => (
    <ImageView
      images={props.data?.map(item => ({
        uri: item.img,
      }))}
      imageIndex={step}
      visible={isVisible}
      onRequestClose={() => setisVisible(false)}
    />
  );

  return (
    <View>
      <Carousel
        autoPlay={autoPlay && isVisible == false}
        ref={carouselRef}
        {...props}
        onScrollEnd={index => setstep(index)}
        renderItem={({ item, index }) => (
          <Button
            disabled={!previewAble}
            onPress={() => setisVisible(true)}
            key={`carousel-${index}`}
          >
            {props.renderItem({
              item,
              index,
              animationValue: undefined,
            })}
          </Button>
        )}
      />
      {indicator && footer()}
      {previewModal()}
    </View>
  );
};

export default App;
