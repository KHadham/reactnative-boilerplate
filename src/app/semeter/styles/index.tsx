import { spacing } from '@constants/spacing';
import { COLOR_BASE_PRIMARY_MAIN } from '@themes/index';
import { widthByScreen } from '@utils/dimensions';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageDetailReklame: {
    width: widthByScreen(20),
    height: widthByScreen(20),
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
  },
  circleBtn: {
    borderRadius: 100,
    backgroundColor: COLOR_BASE_PRIMARY_MAIN,
    padding: spacing.sm,
  },
  fabWrap: {
    position: 'absolute',
    zIndex: 10,
    // width: widthByScreen(100),
    padding: spacing.md,
    bottom: 0,
    alignItems: 'flex-end',
    gap: spacing.md,
    right: 0,
  },
  fabTopWrap: {
    position: 'absolute',
    zIndex: 10,
    // width: widthByScreen(100),
    padding: spacing.md,
    top: 0,
    alignItems: 'flex-end',
    gap: spacing.md,
    right: 0,
  },
});
export default styles;
