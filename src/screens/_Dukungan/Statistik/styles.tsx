import { spacing } from '@constants/spacing';
import { COLOR_GREY } from '@themes/index';
import { StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    margin: spacing.xs,
  },
  menu: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderLeftWidth: 0.5,
    borderColor: COLOR_GREY,
  },
  childlistItemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  listItemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  partaiWrap: {
    padding: spacing.xs,
    flexDirection: 'row',
  },
});

// conditional styling

const dot = (color: string): ViewStyle => ({
  ...styles.dot,
  backgroundColor: color,
});

export default {
  ...styles,
  dot,
};
