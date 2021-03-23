import { StyleSheet, Platform } from 'react-native';
import { TEXT_REGULAR } from './fonts';
import { PRIMARY_COLOR } from './constants';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: 114,
    marginHorizontal: 24,
  },
  footer: {
    marginBottom: Platform.OS === 'ios' ? 35 : 5,
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 33,
    letterSpacing: 0.0041,
    fontFamily: TEXT_REGULAR,
    marginBottom: 24,
  },
  bodyText: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0.0041,
    color: '#6B7583',
    fontFamily: TEXT_REGULAR,
  },
  labelText: {
    fontSize: 14,
    color: '#ACB5BE',
    marginBottom: 10,
    fontWeight: '400',
    lineHeight: 19,
    letterSpacing: 0.0012,
  },
  textInput: {
    width: '85%',
    fontFamily: TEXT_REGULAR,
    fontSize: 25,
    borderBottomColor: '#F1F2F4', // Add this to specify bottom border color
    borderBottomWidth: 2, // Add this to specify bottom border thickness
    paddingVertical: 4,
  },
  mainButton: {
    marginBottom: 5,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    borderRadius: 27.5,
  },
  mainButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: TEXT_REGULAR,
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
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: TEXT_REGULAR,
  },
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 100,
    width: 64,
    height: 64,
  },
});
