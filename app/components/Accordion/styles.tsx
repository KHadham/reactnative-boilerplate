import { spacing } from '@app/constants/spacing';
import { COLOR_GREY } from '@app/styles';
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
