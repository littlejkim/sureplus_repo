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
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },

  headerCenter: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    flex: 1,
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});
