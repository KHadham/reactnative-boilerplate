import { spacing } from '@constants/spacing';
import { widthByScreen } from '@utils/dimensions';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  gradientHeader: {
    position: 'absolute',
    width: widthByScreen(100),
    height: '100%',
  },
  headerContentWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  innerheaderContentWrap: {
    margin: spacing.md,
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  nameLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
export default styles;
