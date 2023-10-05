import { spacing } from '@constants/spacing';
import { COLOR_FONT_PRIMARY_DARK, FONT_SIZE_SUBTITLE } from '@themes/index';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  baseStyleHtml: {
    fontFamily: 'Inter-Regular',
    color: COLOR_FONT_PRIMARY_DARK,
    fontSize: FONT_SIZE_SUBTITLE,
    lineHeight: spacing.lg,
  },
  acordionContent: { padding: spacing.md,  },
});
export default styles;
