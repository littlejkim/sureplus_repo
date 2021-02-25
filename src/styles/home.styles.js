import { StyleSheet } from 'react-native';
import {
  PRIMARY_COLOR,
  TEXT_BOLD,
  TEXT_DEMI,
  TEXT_REGULAR,
} from '../styles/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    // flexDirection: 'column',
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
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },

  reportContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignSelf: 'stretch',
  },

  cardContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 5, // shadow on Android
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  cardContainerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  cardTitleText: {
    fontFamily: TEXT_REGULAR,
    color: '#8A8A8F',
  },

  cardSubscriptionTitleText: {
    fontFamily: TEXT_BOLD,
  },

  cardSubscriptionPriceText: {
    fontFamily: TEXT_REGULAR,
    color: '#8A8A8F',
  },

  subscriptionContainer: {
    flexDirection: 'column',
    marginHorizontal: 15,
  },
  subscriptionIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});
