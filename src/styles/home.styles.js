import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
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
    paddingLeft: 15,
  },

  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
  },

  body: {
    flex: 1,
  },

  image: {
    flex: 1,
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});
