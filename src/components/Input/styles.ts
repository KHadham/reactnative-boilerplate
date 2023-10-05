import {
  COLOR_EVENT_ERROR,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_FONT_PRIMARY_LIGHT,
  COLOR_WHITE,
} from '@themes/index';
import { heightByScreen } from '@utils/dimensions';
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

// type Styles = {
//   rightIcon: (type: string) => ViewStyle | TextStyle | ImageStyle,
//   rightIconBot: ViewStyle,
//   toogleContainer: ViewStyle,
//   toogles: ViewStyle,
//   closeBtn: ViewStyle,
// };

const styles = StyleSheet.create({
  innerInput: {
    flex: 7,
    paddingHorizontal: 8,
    color: COLOR_FONT_PRIMARY_DARK,
  },
  basicInput: {
    height: heightByScreen(8),
    borderWidth: 1,
    marginVertical: 4,
    flexDirection: 'row',
    minHeight: 40,
    backgroundColor: COLOR_WHITE,
  },
  input: {
    flex: 7,
    paddingHorizontal: 8,
    color: COLOR_FONT_PRIMARY_DARK,
  },
  labelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideComponentWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  sideComponentCustom: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 0.5,
  },
  rightIconBot: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 4,
    flex: 1,
  },
  toogleContainer: {
    height: 30,
    width: 55,
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  toogles: {
    height: 24,
    width: 24,
    backgroundColor: COLOR_WHITE,
    borderRadius: 30,
  },
  closeBtn: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: COLOR_EVENT_ERROR,
    borderRadius: 100,
    top: -10,
    right: -10,
  },
  pickerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 4,
  },
  listImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 14,
  },
  footerImgList: {
    borderWidth: 0.5,
    width: 86,
    height: 86,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 14,
  },
  pickerModal: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flexDirection: 'row',
    backgroundColor: COLOR_WHITE,
    justifyContent: 'center',
  },
  listModal: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  headerList: {
    borderWidth: 2,
    width: 50,
    borderRadius: 100,
    borderColor: COLOR_FONT_PRIMARY_LIGHT,
    marginTop: 12,
  },
  itemSelect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  otpBlock: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 12,
    margin: 2,
    maxWidth: 48,
    justifyContent: 'center',
    backgroundColor: COLOR_WHITE,
  },
  pickerImgBtn: { alignItems: 'center', flex: 1, padding: 20 },
});

export default styles;
