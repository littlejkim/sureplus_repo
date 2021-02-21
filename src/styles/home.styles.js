import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  header: {
    minHeight: 50,
    flexDirection: 'row',
  },

  headerLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerCenter: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerRight: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: 35,
    width: 35,
  },
});
