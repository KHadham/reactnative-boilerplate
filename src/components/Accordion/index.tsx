import React, { useRef, useState } from 'react';
import { View, Animated, TouchableOpacity, ViewStyle } from 'react-native';
import { Icon } from '@components';
import { COLOR_BASE_PRIMARY_MAIN } from '@themes/index';
import { LayoutAnimationHandler } from '@utils/uiHandler';
import styles from './styles';
import { spacing } from '@constants/spacing';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

interface AppProps {
  arrow?: Boolean;
  content: any;
  keys: number;
  style?: ViewStyle;
  isLoading?: boolean;
}

const App: React.FC<AppProps> = ({
  arrow = true,
  content,
  keys,
  style,
  isLoading = false,
}) => {
  const [isExpand, setisExpand] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current; // Initial opacity: 0

  const rotating = () => {
    Animated.timing(rotateAnim, {
      toValue: isExpand ? 0 : 1, // The final height after the animation
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const arrowComponent = () => {
    const interpolatedRotation = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    return (
      <View style={styles.arrowWrap}>
        <Animated.View
          style={{
            transform: [{ rotate: interpolatedRotation }],
            margin: spacing.md,
          }}
        >
          <Icon
            name={'chevron-down'}
            size={30}
            color={COLOR_BASE_PRIMARY_MAIN}
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      key={keys}
      onPress={() => {
        LayoutAnimationHandler();
        setisExpand(!isExpand);
        rotating();
      }}
      style={[styles.container, style]}
    >
      {content(isExpand)}
      {arrow && arrowComponent()}
    </TouchableOpacity>
  );
};

export default App;
