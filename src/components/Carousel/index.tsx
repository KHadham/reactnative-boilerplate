import React, { useEffect, useRef, useState } from 'react';

import { Button, Icon } from '@components';
import { Text, Stepper, AutoImage } from '@components';
import Carousel, { TCarouselProps } from 'react-native-reanimated-carousel';
import ImageView from 'react-native-image-viewing';

interface AppProps {
  indicator?: boolean;
  previewAble?: boolean;
}

type CombinedProps = AppProps & TCarouselProps;
const App: React.FC<CombinedProps> = ({
  indicator = false,
  previewAble,
  ...props
}) => {
  const carouselRef = useRef(null);

  const [step, setstep] = useState(0);
  const [isVisible, setisVisible] = useState(false);

  useEffect(() => {
    console.log('step :>> ', step);
  }, [step]);

  useEffect(() => {
    // setstep(carouselRef.current.getCurrentIndex());
  }, [carouselRef.current]);

  const footer = () => (
    <Stepper
      dataStep={props.data?.length}
      currentStep={step + 1}
      onPressStep={(id: number) =>
        carouselRef.current.scrollTo({ index: id - 1, animated: true })
      }
    />
  );

  const previewModal = () => {
    if (isVisible)
      return (
        <ImageView
          onImageIndexChange={imageIndex => {
            console.log('imageIndex :>> ', imageIndex);
          }}
          images={props.data?.map(item => ({
            uri: item.img,
          }))}
          imageIndex={step}
          visible={isVisible}
          onRequestClose={() => setisVisible(false)}
        />
      );
  };

  return (
    <>
      <Carousel
        ref={carouselRef}
        {...props}
        onProgressChange={(offsetProgress, absoluteProgress) => {
          if (!absoluteProgress.toString().includes('.')) {
            setstep(absoluteProgress);
          }
        }}
        autoPlay={false}
        style={{ alignContent: 'center' }}
        loop={true}
        renderItem={({ item, index }) => (
          <Button disabled={!previewAble} onPress={() => setisVisible(true)}>
            {props.renderItem({
              item,
              index,
              animationValue: undefined,
            })}
          </Button>
        )}
      />
      {footer()}
      {previewModal()}
    </>
  );
};

export default App;
