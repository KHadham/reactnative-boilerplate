import { StyleSheet } from 'react-native';

import { COLOR_BLACK, COLOR_WHITE } from '@app/styles';


export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLOR_WHITE,
    borderRadius: 5,
    paddingVertical: 0.5,
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2
  },
  photo: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  placeholder: {
    height: 100
  },
  placeholderMedia: {
    width: 80,
    height: 80,
    borderRadius: 5
  }
});
