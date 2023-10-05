import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { funcStyle, styles } from './styles';
import { Button, Icon, Text } from '@components';
import FastImage, { ImageStyle, ResizeMode } from 'react-native-fast-image';
import IMAGES from '@images';
import {
  COLOR_BACKGROUND_ERROR,
  COLOR_BACKGROUND_INFORMATION,
  COLOR_BACKGROUND_SUCCESS,
  COLOR_EVENT_ERROR,
  COLOR_EVENT_INFORMATION,
  COLOR_EVENT_SUCCESS,
  COLOR_GREY,
} from '@themes/index';
import { getInitials, isImageUrl } from '@utils/index';
import ImageView from "react-native-image-viewing";

interface AppProps {
  style?: ImageStyle;
  source: any;
  resizeMode?: ResizeMode;
  size?: number;
  badge?: number | 'online' | 'offline';
  badgeColor?: string;
  avatarColor?: string;
  count?: number
}

const App: React.FC<AppProps> = ({
  style,
  source,
  resizeMode,
  size,
  badgeColor,
  badge,
  avatarColor = COLOR_BACKGROUND_INFORMATION,
  count
}) => {

  const [isVisible, setisVisible] = useState(false)

  const container = {
    width: size,
    height: size,
    borderRadius: 100,
    borderWidth:1,
    borderColor:COLOR_GREY
  } as ImageStyle

  const badgeColoring = () => {
    if (badge == 'online') return COLOR_EVENT_SUCCESS;
    else if (badge == 'offline') return COLOR_GREY;
    else {
      if (badgeColor !== undefined) return badgeColor;
      else return COLOR_EVENT_INFORMATION;
    }
  };

  const baseImage = () => {
    if (isImageUrl(source)) {
      return (
       <Button onPress={()=>setisVisible(true)}>
         <FastImage
          style={[style, container]}
          source={{ uri: source }}
          resizeMode={resizeMode}
        />
       </Button>
      );
    } else {
      return (
        <View
          style={[
            funcStyle(size, avatarColor).initial,
            container,
          ]}
        >
          <Text size="header" weight="bold">
            {getInitials(source)}
          </Text>
        </View>
      );
    }
  };

  const badgeUi = () => {
    return (
      <View style={funcStyle(size, badgeColoring()).badge}>
        <Text weight="bold" color='white'>{count > 9 ? '9+' : count}</Text>
      </View>
    );
  };

  const modalPreview = () => (
    <ImageView
      images={[{ uri: source }]}
      imageIndex={0}
      visible={isVisible}
      onRequestClose={() => setisVisible(false)}
    />
  )

  return (
    <View style={styles.wrap}>
      {baseImage()}
      {badgeUi()}
      {modalPreview()}
    </View>
  );
};

export default App;
