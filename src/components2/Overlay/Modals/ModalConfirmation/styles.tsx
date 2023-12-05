import { spacing } from '@constants/spacing';
import { COLOR_WHITE } from '@themes/index';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  contentWrap: {
    backgroundColor: COLOR_WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default styles;
