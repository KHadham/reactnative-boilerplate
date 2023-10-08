import { spacing } from '@constants/spacing';
import { COLOR_GREY_LIGHT, COLOR_WHITE } from '@themes/index';
import { heightByScreen } from '@utils/dimensions';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appMenuWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    gap: spacing.xs,
  },
  appMenu: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: COLOR_WHITE,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  appImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  sliderImage: {
    width: '100%',
    height: heightByScreen(20),
    // borderRadius: 10,
  },
  sliderImageWrap: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLOR_GREY_LIGHT,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: COLOR_WHITE,
  },
});
export default styles;
