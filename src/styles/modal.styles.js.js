import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from './constants';
import { TEXT_BOLD, TEXT_REGULAR } from './fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    height: '30%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    fontFamily: TEXT_BOLD,
  },
  body: {
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily: TEXT_REGULAR,
    fontSize: 15,
  },

  button: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: PRIMARY_COLOR,
  },

  buttonText: {
    fontFamily: TEXT_BOLD,
    color: 'white',
    fontSize: 15,
  },
});
