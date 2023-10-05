import { COLOR_FONT_PRIMARY_LIGHT, COLOR_WHITE } from '@themes/index';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: widthByScreen(100),
    height: heightByScreen(100),
  },
  pdf: {
    flex: 1,
    width: widthByScreen(100),
    height: heightByScreen(100),
  },
});
