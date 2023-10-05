import { COLOR_TRANSPARENT } from '@themes/index';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loadingBackground: {
    width: widthByScreen(100),
    height: heightByScreen(100),
    backgroundColor: COLOR_TRANSPARENT,
    position: 'absolute',
    zIndex: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default styles;
