// public imports
import React from 'react';
import { Image, Platform, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Host } from 'react-native-portalize';

// custom imports
import { HomeScreen, DiscoverScreen, GroupsScreen } from '../screens';
import { TEXT_BOLD, TEXT_REGULAR, HEADER_TEXT_SIZE } from '../styles/constants';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const DiscoverStack = createStackNavigator();
const GroupsStack = createStackNavigator();

// home stack
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#F1F2F4', shadowColor: 'transparent' },
        headerTitleStyle: {
          fontFamily: TEXT_BOLD,
          fontSize: HEADER_TEXT_SIZE,
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '',
        }}
      />
    </HomeStack.Navigator>
  );
}

// discover stack
function DiscoverStackScreen() {
  return (
    <DiscoverStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'white' },
        headerTitleStyle: {
          fontFamily: TEXT_BOLD,
          fontSize: HEADER_TEXT_SIZE,
        },
      }}>
      <DiscoverStack.Screen name="Discover" component={DiscoverScreen} />
    </DiscoverStack.Navigator>
  );
}

// groups stack
function GroupsStackScreen() {
  return (
    <GroupsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'white' },
        headerTitleStyle: {
          fontFamily: TEXT_BOLD,
          fontSize: HEADER_TEXT_SIZE,
        },
      }}>
      <GroupsStack.Screen name="Groups" component={GroupsScreen} />
    </GroupsStack.Navigator>
  );
}

// bottom bar stying
const barStyle = {
  activeTintColor: 'black',
  inactiveTintColor: 'gray',
  labelStyle: {
    fontFamily: TEXT_REGULAR,
    fontSize: 13,
  },
  style: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Platform.OS === 'ios' ? 100 : 70,
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
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              const focusedOpacity = focused ? 1.0 : 0.5;
              return (
                <Image
                  style={{
                    width: size + 11,
                    height: size + 11,
                    opacity: focusedOpacity,
                  }}
                  source={require('../assets/images/home.png')}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Discover"
          component={DiscoverStackScreen}
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              const focusedOpacity = focused ? 1.0 : 0.5;
              return (
                <Image
                  style={{
                    width: size + 11,
                    height: size + 11,
                    opacity: focusedOpacity,
                  }}
                  source={require('../assets/images/subscription.png')}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Groups"
          component={GroupsStackScreen}
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              const focusedOpacity = focused ? 1.0 : 0.5;
              return (
                <Image
                  style={{
                    width: size + 11,
                    height: size + 11,
                    opacity: focusedOpacity,
                  }}
                  source={require('../assets/images/groups.png')}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </Host>
  );
};
