import { spacing } from '@constants/spacing';
import { COLOR_GREY } from '@themes';
import { StyleSheet } from 'react-native';

const funcStyle = (size?: number, backgroundColor?: string) => {
  return StyleSheet.create({
    badge: {
      backgroundColor,
      position: 'absolute',
      width: size / 2.5,
      height: size / 2.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      bottom: 0,
      right: 0,
      zIndex:10
    },
    initial: {
      backgroundColor: backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: COLOR_GREY,
    },
  });
};

const styles = StyleSheet.create({
  wrap: {
    padding: spacing.xs,
  },
});

export { funcStyle, styles };
