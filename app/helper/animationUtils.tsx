import { SetStateAction, MutableRefObject } from 'react';
import { widthByScreen } from './dimensions';
import { LayoutAnimation, Platform, UIManager } from 'react-native';

export const handleHorizontalScroll = (event: {
  nativeEvent: { contentOffset: { x: any } },
}) => {
  return new Promise(resolve => {
    const x = event?.nativeEvent?.contentOffset?.x;
    return resolve(Math.floor(x) / Math.floor(widthByScreen(100)) + 1);
  });
};

export const scrollToIndexHorizontal = (
  index: SetStateAction<number>,
  ref: MutableRefObject<any>
) => {
  if (ref.current) {
    const realIndex = typeof index === 'function' ? index(ref.current) : index;
    ref.current?.scrollTo({
      x: (realIndex - 1) * widthByScreen(100),
      animated: true,
    });
  }
};

export const scrollToIndex = (
  index: SetStateAction<number>,
  ref: MutableRefObject<any>
) => {
  ref.current?.scrollToIndex({ index, animated: true });
};

export const LayoutAnimationHandler = () => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  LayoutAnimation.configureNext({
    duration: 200,
    create: { type: 'easeIn', property: 'opacity' },
    update: { type: 'easeInEaseOut', springDamping: 0.4 },
    delete: { type: 'easeOut', property: 'opacity' },
  });
};
