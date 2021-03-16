import { StyleSheet, Platform } from 'react-native';
import { TEXT_BOLD, TEXT_DEMI, TEXT_REGULAR } from './fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  titleText: {
    fontSize: 30,
    fontFamily: TEXT_BOLD,
  },
  textInput: {
    width: '85%',
    fontFamily: TEXT_REGULAR,
    fontSize: 25,
  },
  mainButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    borderRadius: 30,
    marginHorizontal: 15,
  },
  mainButtonText: {
    fontSize: 19,
    fontFamily: TEXT_DEMI,
  },
  subButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    borderRadius: 30,
    marginHorizontal: 15,
  },
  subButtonText: {
    fontSize: 17,
    fontFamily: TEXT_REGULAR,
    color: 'white',
  },
});
