import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  ViewStyle,
  Text,
} from 'react-native';
import { Button, Icon } from '@components';
import { COLOR_BASE_PRIMARY_MAIN } from '@themes/index';
import { LayoutAnimationHandler } from '@utils/uiHandler';
import styles from './styles';
import { spacing } from '@constants/spacing';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

interface AppProps {
  arrow?: Boolean;
  content: any;
  contentExpand: any;
  keys: number;
  style?: ViewStyle;
  isLoading?: boolean; // isLoading only work with flatlist
}

const App: React.FC<AppProps> = ({
  arrow = true,
  content,
  contentExpand,
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
      useNativeDriver: true,
    }).start();
  };

  const arrowComponent = () => {
    const interpolatedRotation = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    return (
      <View>
        <Animated.View
          style={[{ transform: [{ rotate: interpolatedRotation }] }]}
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
    <TouchableOpacity // dont use ripple button
      disabled={isLoading}
      key={keys}
      onPress={() => {
        LayoutAnimationHandler();
        setisExpand(!isExpand);
        rotating();
      }}
      style={[styles.container, style]}
    >
      {isLoading ? (
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={{ marginVertical: spacing.xs, borderRadius: 10 }}
        />
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 5,justifyContent:'center' }}>{content}</View>
          {arrow && arrowComponent()}
        </View>
      )}
      {isExpand && (
        <>
          <View style={styles.line} />
          {contentExpand}
        </>
      )}
    </TouchableOpacity>
  );
};

export default App;
