import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';
import { Button, Icon } from '@components';
import FastImage, { ImageStyle, ResizeMode } from 'react-native-fast-image';
import IMAGES from '@images';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

interface AppProps {
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
  isLoading
}) => {

  const [isVisible, setisVisible] = useState(false);
  // const [isLoading, setisLoading] = useState(false);

  const previewModal = () => (
    <ImageView
      images={[{ uri: source }]}
      imageIndex={0}
      visible={isVisible}
      onRequestClose={() => setisVisible(false)}
    />
  );

  const coreImage = () => {
    if (typeof source === 'number') {
      return (
        <FastImage style={style} source={source} resizeMode={resizeMode} />
      );
    } else {
      return (
        <FastImage
          // onLoadStart={() => setisLoading(true)}
          // onLoadEnd={() => setisLoading(false)}
          style={style}
          source={{
            uri: source,
          }}
          resizeMode={resizeMode}
        />
      );
    }
  };
  console.log('isLoading :>> ', isLoading);
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
