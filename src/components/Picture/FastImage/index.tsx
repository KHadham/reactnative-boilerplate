import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';
import { Button, Icon } from '@components';
import FastImage, {
  ImageStyle,
  ResizeMode,
  FastImageProps,
} from 'react-native-fast-image';
import IMAGES from '@images';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

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
  const [isloading, setisloading] = useState(false);

  const previewModal = () => (
    <ImageView
      images={[source]}
      imageIndex={0}
      visible={isVisible}
      onRequestClose={() => setisVisible(false)}
    />
  );

  const coreImage = () => {
    return (
      <FastImage
        onProgress={e =>
          console.log(e.nativeEvent.loaded / e.nativeEvent.total)
        }
        onLoadStart={() => setisloading(true)}
        onLoadEnd={() => setisloading(false)}
        style={style}
        source={source}
        resizeMode={resizeMode}
        {...rest}
      />
    );
  };
  return (
    <>
      <Button onPress={() => previewAble && !isLoading && setisVisible(true)}>
        {isLoading ? (
          <ShimmerPlaceHolder LinearGradient={LinearGradient} style={style} />
        ) : (
          coreImage()
        )}
      </Button>
      {previewModal()}
    </>
  );
};

export default App;
