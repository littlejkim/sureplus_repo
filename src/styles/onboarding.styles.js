import { StyleSheet, Platform } from 'react-native';
import { PRIMARY_COLOR, TEXT_DEMI, TEXT_REGULAR } from './constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: Platform.OS === 'ios' ? 50 : 20,
  },
  mainButton: {
    marginBottom: 20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  mainButtonText: {
    fontSize: 19,
    fontFamily: TEXT_DEMI,
    color: PRIMARY_COLOR,
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
