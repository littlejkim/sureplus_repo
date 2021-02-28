import { StyleSheet, Platform } from 'react-native';
import { TEXT_BOLD, TEXT_DEMI, TEXT_REGULAR } from './fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginHorizontal: 15,
    marginBottom: Platform.OS === 'ios' ? 50 : 20,
  },
  titleText: {
    fontSize: 30,
    fontFamily: TEXT_BOLD,
  },
  textInput: {
    fontFamily: TEXT_REGULAR,
    fontSize: 25,
  },
  mainButton: {
    marginBottom: 20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  mainButtonText: {
    fontSize: 19,
    fontFamily: TEXT_DEMI,
  },
  subButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  subButtonText: {
    fontSize: 17,
    fontFamily: TEXT_REGULAR,
    color: 'white',
  },
});
