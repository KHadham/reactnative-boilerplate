import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ViewStyle, Animated } from 'react-native';
import styles from './styles';
import { Button, LoadingWraper } from '@components';
import FastImage, {
  ImageStyle,
  ResizeMode,
  FastImageProps,
} from 'react-native-fast-image';
import IMAGES from '@images';
import ImageView from 'react-native-image-viewing';
// import { useLoadingBackground } from '@hooks'

interface AppProps extends FastImageProps {
  style?: ImageStyle;
  source: any;
  resizeMode?: ResizeMode;
  previewAble?: boolean;
  isLoading?: boolean;
}

const App: React.FC<AppProps> = ({
  style,
  source,
  resizeMode,
  previewAble,
  isLoading,
  ...rest
}) => {
  const [isVisible, setisVisible] = useState(false);
  // const [progress, setprogress] = useState(false);
  const [isImageProsgressing, setisImageProgressing] = useState(null);

  const previewModal = () => (
    <ImageView
      images={[source]}
      imageIndex={0}
      visible={isVisible}
      onRequestClose={() => setisVisible(false)}
    />
  );

  const coreImage = () => {
    // TODO loading image processing
    
    // if (isImageProsgressing !== null) {
    //   return (
    //     <Animated.View style={{ backgroundColor: 'red' }} />
    //   )
    // } else {
      return (
        <FastImage
          // onProgress={e => {
          //   setisImageProgressing((e.nativeEvent.loaded / e.nativeEvent.total) * 100)
          // }}
          // onLoadStart={() => setisImageProgressing(0)}
          // onLoadEnd={() => setisImageProgressing(100)}
          style={style}
          source={source}
          resizeMode={resizeMode}
          {...rest}
        />
      );
    }
  // };

  return (
    <>
      <Button disabled={isLoading} onPress={() => previewAble && !isLoading && setisVisible(true)} >
        <LoadingWraper isLoading={isLoading} >
          {coreImage()}
        </LoadingWraper>
      </Button>
      {previewModal()}
    </>
  );
};

export default App;
