import { StyleSheet, Platform } from 'react-native';
import { TEXT_REGULAR } from './fonts';
import { ERROR_COLOR, PRIMARY_COLOR } from './constants';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 114,
  },
  footer: {
    marginBottom: Platform.OS === 'ios' ? 35 : 5,
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
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
  inputContainer: {
    marginTop: 40,
    flexDirection: 'row',
    borderBottomWidth: 2,
    paddingVertical: 0,
  },
  availablityIcon: {
    resizeMode: 'contain',
    flex: 0.07,
    height: null,
    width: null,
  },
  feedbackText: {
    color: ERROR_COLOR,
    marginTop: 8,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    letterSpacing: 0.0012,
  },
  textInput: {
    fontFamily: TEXT_REGULAR,
    fontSize: 25,
    borderBottomWidth: 2,
    paddingVertical: 4,
  },
  mainButton: {
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
  },
  subButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22,
    fontFamily: TEXT_REGULAR,
  },
  nextButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 100,
    width: 134,
    height: 64,
    elevation: 5, // shadow on Android
    shadowColor: '#2f0057',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  nextButtonText: {
    color: 'white',
    fontFamily: TEXT_REGULAR,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
  },
  linkedBankContainer: {
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    height: 62,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 5, // shadow on Android

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.09,
    shadowRadius: 5,
  },
  linkedBankText: {
    flex: 1,
    fontFamily: TEXT_REGULAR,
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: -0.041,
  },
  subscriptionsFoundText: {
    fontFamily: TEXT_REGULAR,
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: -0.041,
    marginBottom: 24,
  },
  linkCompleteTopContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 114,
  },
  linkCompleteBottomContainer: {
    flex: 1,
    marginTop: 32,
  },
});
