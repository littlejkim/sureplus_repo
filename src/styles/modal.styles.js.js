import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from './constants';
import { TEXT_BOLD, TEXT_REGULAR } from './fonts';

export default StyleSheet.create({
  container: {
    borderRadius: 14,
    height: 200,
    justifyContent: 'space-between',
  },
  title: {
    paddingBottom: 5,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: TEXT_REGULAR,
    lineHeight: 27.32,
    fontWeight: '600',
  },
  body: {
    textAlign: 'center',
    fontFamily: TEXT_REGULAR,
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 23,
  },
  button: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    height: 58,
    width: '100%',
    backgroundColor: PRIMARY_COLOR,
  },

  buttonText: {
    fontFamily: TEXT_REGULAR,
    fontWeight: '600',
    color: 'white',
    lineHeight: 22,
    fontSize: 17,
  },
});
