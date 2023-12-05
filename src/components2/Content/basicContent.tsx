import React, { ReactNode } from 'react';
import { View, ImageSourcePropType, Image } from 'react-native';
import { Text } from '@components';
import { spacing } from '@constants/spacing';

interface AppProps {
  image: ImageSourcePropType | String | ReactNode;
  title: string;
  desc: string;
  height?: number | 'auto'; // set to heightByScreen(70) to make it full 
}

const App: React.FC<AppProps> = ({
  title,
  desc,
  image = undefined,
  height = 'auto',
}) => {
  const imagesUi = () => {
    if (typeof image === 'string') {
      return <Image source={{ uri: image }} />;
    } else if (React.isValidElement(image)) {
      return image;
    } else {
      return null;
    }
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        height: height,
        padding: spacing.md,
      }}
    >
      {imagesUi()}
      {title && (
        <Text size="title" weight="bold" position='center'>
          {title}
        </Text>
      )}
      {desc && (
        <Text size="subTitle" position="center">
          {desc}
        </Text>
      )}
    </View>
  );
};

export default App;
