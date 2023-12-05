import { widthByScreen } from '@utils/dimensions';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  basicLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    borderRadius: 50,
    padding: 20,
  },
});
export default styles;
