import { StyleSheet } from 'react-native';
import {
  COLOR_BASE_PRIMARY_DARK,
  COLOR_FONT_PRIMARY_LIGHT,
  COLOR_GREY,
  COLOR_WHITE,
} from '@themes/index';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { spacing } from '@constants/spacing';
import { toTransparent } from '@utils/uiHandler';

const styles = StyleSheet.create({
  botBar: {
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(50, 137, 230,0.1)',
    borderTopWidth: 0.5,
    borderColor: COLOR_BASE_PRIMARY_DARK,
  },
  welcomeModal: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: COLOR_WHITE,
    borderRadius: 20,
    paddingTop: spacing.xxl,
  },
  line: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: COLOR_FONT_PRIMARY_LIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogoBanner: {
    width: widthByScreen(70),
    height: heightByScreen(15),
  },
  containerSplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: widthByScreen(15),
  },
  botLoginWrap: {
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  blurWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: toTransparent(COLOR_WHITE, 0.75),
  },
  innerLoginWrap: {
    padding: 30,
    height: '100%',
    width: '100%',
  },
  logoWrap: {
    alignItems: 'center',
    alignContent: 'center',
  },
  logoHeaderWrap: {
    padding: spacing.lg,
    paddingVertical: spacing.xxl,
    gap: 10,
  },
});
export default styles;
