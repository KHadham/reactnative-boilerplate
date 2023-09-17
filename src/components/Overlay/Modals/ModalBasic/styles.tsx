import { COLOR_FONT_PRIMARY_LIGHT, COLOR_WHITE } from '@themes/index';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    height: 30,
    borderTopWidth: 1,
    borderColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_WHITE,
    borderBottomWidth: 0.5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  scrollView: {
    backgroundColor: COLOR_WHITE,
  },
  jidat: {
    borderWidth: 2,
    borderRadius: 20,
    width: 50,
    margin: 26,
    borderColor: '#a3a3a3',
  },
  headerHandle: {
    borderWidth: 2,
    width: 50,
    borderRadius: 100,
    borderColor: COLOR_FONT_PRIMARY_LIGHT,
    margin: 12,
  },
});
