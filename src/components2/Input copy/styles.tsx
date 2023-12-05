import {
  COLOR_EVENT_ERROR,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_FONT_PRIMARY_LIGHT,
  COLOR_WHITE,
} from '@themes/index';
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

// type Styles = {
//   rightIcon: (type: string) => ViewStyle | TextStyle | ImageStyle,
//   rightIconBot: ViewStyle,
//   toogleContainer: ViewStyle,
//   toogles: ViewStyle,
//   closeBtn: ViewStyle,
// };

const styles = StyleSheet.create({
  rightIcon: (type: string) => ({
    justifyContent: type === 'area' ? 'flex-end' : 'center',
    alignItems: 'center',
    // padding: 4,
    flex: 1,
  }),
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
    zIndex: 10,
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
    borderRadius: 4,
    borderWidth: 1,
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
    backgroundColor: 'white',
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
});

export default styles;
