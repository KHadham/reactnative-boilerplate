import { spacing } from '@constants/spacing';
import {
  COLOR_BACKGROUND_ERROR,
  COLOR_BACKGROUND_SUCCESS,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_GREY,
  COLOR_GREY_LIGHT,
  FONT_SIZE_DESC,
  FONT_SIZE_SUBTITLE,
} from '@themes/index';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  baseStyleHtml: {
    fontFamily: 'Inter-Regular',
    color: COLOR_FONT_PRIMARY_DARK,
    fontSize: FONT_SIZE_DESC,
    lineHeight: spacing.lg,
  },
  itemProdukHukum: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: COLOR_GREY,
    padding: spacing.sm,
    flexDirection: 'row',
    marginTop: spacing.md,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLOR_BACKGROUND_SUCCESS
  },
  itemProdukHukumNull: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: COLOR_GREY,
    padding: spacing.sm,
    flexDirection: 'row',
    marginTop: spacing.md,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLOR_BACKGROUND_ERROR
  },
});
export default styles;
