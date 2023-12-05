import { StyleSheet } from 'react-native';

import { COLOR_BLACK, COLOR_WHITE } from '@themes/index';
import { spacing } from '@constants/spacing';

export default StyleSheet.create({
  shadowing: {
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  // container: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   backgroundColor: COLOR_WHITE,
  //   padding: spacing.sm,
  // },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: COLOR_WHITE,
    padding: spacing.sm,
  },
  photo: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  placeholder: {
    height: 100,
  },
  placeholderMedia: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
});
