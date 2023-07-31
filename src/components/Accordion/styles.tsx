import { spacing } from '@constants/spacing';
import { COLOR_GREY } from '@themes/index';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: COLOR_GREY,
  },
  arrowWrap: {
    position: 'absolute',
    right: 0,
  },
});
export default styles;
