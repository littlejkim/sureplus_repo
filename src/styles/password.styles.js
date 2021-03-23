import { StyleSheet } from 'react-native';
import { TEXT_REGULAR } from './fonts';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F0459',
    paddingHorizontal: 24,
  },

  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 33,
    letterSpacing: 0.0041,
    fontFamily: TEXT_REGULAR,
    marginBottom: 8,
  },
  bodyText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 23,
    letterSpacing: 0.0041,
    fontFamily: TEXT_REGULAR,
    marginBottom: 40,
  },
});
