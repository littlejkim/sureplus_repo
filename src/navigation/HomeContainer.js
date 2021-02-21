// public imports
import React from 'react';
import { Button, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Host } from 'react-native-portalize';

// custom imports
import { HomeScreen, DiscoverScreen, GroupsScreen } from '../screens';
import { FONT_FAMILY_REGULAR } from '../styles/constants';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const DiscoverStack = createStackNavigator();
const GroupsStack = createStackNavigator();

// home stack
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

// discover stack
function DiscoverStackScreen() {
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen name="Discover" component={DiscoverScreen} />
    </DiscoverStack.Navigator>
  );
}

// groups stack
function GroupsStackScreen() {
  return (
    <GroupsStack.Navigator>
      <GroupsStack.Screen name="Home" component={GroupsScreen} />
    </GroupsStack.Navigator>
  );
}

// bottom bar stying
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

export const HomeContainer = () => {
  return (
    <Host>
      <Tab.Navigator initialRouteName="Home" tabBarOptions={barStyle}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Discover" component={DiscoverStackScreen} />
        <Tab.Screen name="Groups" component={GroupsStackScreen} />
      </Tab.Navigator>
    </Host>
  );
};
