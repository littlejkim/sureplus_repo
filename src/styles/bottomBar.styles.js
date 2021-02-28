// public imports
import { Platform } from 'react-native';

// custom imports
import {
  TEXT_REGULAR,
  BACKGROUND_COLOR_DARK,
  BACKGROUND_COLOR_LIGHT,
} from '../styles/constants';

// light bottom bar stying
export const lightBarStyle = {
  activeTintColor: 'black',
  inactiveTintColor: 'gray',
  labelStyle: {
    fontFamily: TEXT_REGULAR,
    fontSize: 13,
  },
  style: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
    borderTopWidth: 0,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Platform.OS === 'ios' ? 100 : 70,
    shadowOffset: { width: 5, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
};

// dark bottom bar styling
export const darkBarStyle = {
  activeTintColor: 'white',
  inactiveTintColor: 'gray',
  labelStyle: {
    fontFamily: TEXT_REGULAR,
    fontSize: 13,
  },
  style: {
    backgroundColor: BACKGROUND_COLOR_DARK,
    borderTopWidth: 0,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Platform.OS === 'ios' ? 100 : 70,
    shadowOffset: { width: 5, height: 15 },
    shadowColor: 'white',
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
};
