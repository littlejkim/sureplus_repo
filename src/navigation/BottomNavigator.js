// public imports
import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// custom imports
import { HomeStackNavigator } from './HomeStackNavigator';
import { DiscoverScreen, GroupsScreen } from '../components';
import { FONT_FAMILY_REGULAR } from '../styles/constants';

const Tab = createBottomTabNavigator();

const barStyle = {
  activeTintColor: 'black',
  inactiveTintColor: 'gray',
  labelStyle: {
    fontFamily: FONT_FAMILY_REGULAR,
  },
  style: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Platform.OS === 'ios' ? 100 : 70,
    position: 'absolute',
    shadowOffset: { width: 5, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
};

export const BottomNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={barStyle}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
    </Tab.Navigator>
  );
};
