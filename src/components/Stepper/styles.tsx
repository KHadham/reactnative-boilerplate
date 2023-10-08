import { StyleSheet } from 'react-native';

import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_BLACK,
  COLOR_EVENT_INACTIVE,
  COLOR_WHITE,
} from '@themes/index';
import { widthByScreen } from '@utils/dimensions';

export default StyleSheet.create({
  stepWrap: {
    flex: 1,
    alignItems: 'center',
    minWidth: (widthByScreen(100) - 40) / 4,
    maxWidth: (widthByScreen(100) - 40) / 4,
  },
  stepNumber: {
    // backgroundColor: COLOR_BASE_PRIMARY_MAIN,
    width: 26,
    height: 26,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: COLOR_BASE_PRIMARY_MAIN,
    position: 'absolute',
  },
  stepTextWrap: {
    alignItems: 'flex-end',
    marginLeft: 10,
    flex: 1,
  },
  barInactive: {
    margin: 4,
    borderRadius: 10,
    alignContent: 'flex-start',
    backgroundColor: COLOR_EVENT_INACTIVE,
  },
  barActive: {
    height: 10,
    borderRadius: 10,
  },
  txtInactive: {
    borderRadius: 100,
    backgroundColor: COLOR_EVENT_INACTIVE,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalBarWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  verticalBar: {
    flex: 1,
    minHeight: 24,
    borderRadius: 100,
    borderWidth: 2,
  },
  leftHorizontalBar: {
    flex: 1,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  rightHorizontalBar: {
    flex: 1,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
});
