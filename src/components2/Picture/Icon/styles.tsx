import { spacing } from '@constants/spacing';
import { COLOR_EVENT_ERROR } from '@themes/index';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  badge: {
    backgroundColor: COLOR_EVENT_ERROR,
    padding: spacing.xxs,
    position: 'absolute',
    zIndex: 5,
    borderRadius: 10,
    right: spacing.xxs,
  },
});
export default styles;
