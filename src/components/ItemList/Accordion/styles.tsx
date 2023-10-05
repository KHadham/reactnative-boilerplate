import { spacing } from '@constants/spacing';
import { COLOR_BASE_PRIMARY_DARK, COLOR_GREY } from '@themes/index';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: COLOR_GREY,
    padding: spacing.sm,
  },
  arrowWrap: {
    position: 'absolute',
    right: 0,
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor:  COLOR_BASE_PRIMARY_DARK,
    margin: spacing.sm,
    marginBottom: spacing.xs,
  },
});
export default styles;
