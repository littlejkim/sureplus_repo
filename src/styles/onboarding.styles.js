import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, TEXT_DEMI, TEXT_REGULAR } from './constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 5,
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
    marginStart: 20,
    marginEnd: 20,
  },
  signUpButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  signUpButtonTitle: {
    fontSize: 19,
    fontFamily: TEXT_DEMI,
    color: PRIMARY_COLOR,
  },
  loginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  loginButtonTitle: {
    fontSize: 17,
    fontFamily: TEXT_REGULAR,
    color: 'white',
  },
});
