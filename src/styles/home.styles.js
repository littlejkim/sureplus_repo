import { StyleSheet } from 'react-native';
import { TEXT_BOLD, TEXT_REGULAR } from '../styles/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerLeft: {
    paddingLeft: 20,
  },
  profile: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  topContainer: {
    marginTop: 30,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 12,
  },
});
