import { spacing } from '@constants/spacing';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import {
  COLOR_EVENT_INACTIVE,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_FONT_PRIMARY_LIGHT,
  COLOR_WHITE,
} from '@themes/index';
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

const styles = StyleSheet.create({
  emptyWrap: {
    backgroundColor: COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerHandle: {
    borderWidth: 2,
    width: 50,
    borderRadius: 100,
    borderColor: COLOR_FONT_PRIMARY_LIGHT,
    margin: 12,
  },
  itemSelect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  separator: { borderWidth: 0.5, borderColor: COLOR_FONT_PRIMARY_DARK },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 4,
  },
  inputWrap: {
    borderWidth: 1,
    marginVertical:spacing.xs,
    borderRadius: 12,
    borderColor: COLOR_EVENT_INACTIVE,
    flexDirection: 'row',
    height: 48,
    paddingHorizontal: 12,
  },
  listWrap: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    // maxHeight: 50,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    color: COLOR_FONT_PRIMARY_DARK,
    zIndex: 99,
  },
  modalWrap: {
    backgroundColor: COLOR_WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    padding:spacing.md
  },
});

export default styles;
