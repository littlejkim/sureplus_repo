import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, PRIMARY_COLOR } from './constants';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },

  onboardingContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: PRIMARY_COLOR,
  },
});
