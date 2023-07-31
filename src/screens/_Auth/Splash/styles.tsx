import { widthByScreen } from '@utils/dimensions';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: widthByScreen(15),
  },
  image: {
    width: '100%',
    // height: '50%',
  },
});
export default styles;
