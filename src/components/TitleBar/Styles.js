import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');
const Styles = StyleSheet.create({
  container: {
    height: 0.08 * height,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
});


export default Styles;
