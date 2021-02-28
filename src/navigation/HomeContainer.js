// public imports
import React from 'react';
import { Image, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Host } from 'react-native-portalize';
import { useTheme } from '@react-navigation/native';

// custom imports
import { HomeScreen, DiscoverScreen, GroupsScreen } from '../screens';
import { TEXT_BOLD, HEADER_TEXT_SIZE } from '../styles/fonts';
import { darkBarStyle, lightBarStyle } from '../styles/bottomBar.styles';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const DiscoverStack = createStackNavigator();
const GroupsStack = createStackNavigator();

// home stack
function HomeStackScreen() {
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: 'transparent',
        },
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
  const { colors } = useTheme();

  return (
    <DiscoverStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomWidth: 0,
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          color: colors.mainText,
          fontFamily: TEXT_BOLD,
          fontSize: 17,
        },
      }}>
      <DiscoverStack.Screen name="Discover" component={DiscoverScreen} />
    </DiscoverStack.Navigator>
  );
}

// groups stack
function GroupsStackScreen() {
  const { colors } = useTheme();
  return (
    <GroupsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomWidth: 0,
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          color: colors.mainText,
          fontFamily: TEXT_BOLD,
          fontSize: 17,
        },
      }}>
      <GroupsStack.Screen name="Groups" component={GroupsScreen} />
    </GroupsStack.Navigator>
  );
}

export const HomeContainer = () => {
  const { dark } = useTheme();
  return (
    <Host>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={dark ? darkBarStyle : lightBarStyle}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              const focusedOpacity = focused ? 1.0 : 0.4;
              return (
                <Image
                  style={{
                    width: size + 11,
                    height: size + 11,
                    opacity: focusedOpacity,
                    tintColor: dark ? 'white' : 'black',
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
              const focusedOpacity = focused ? 1.0 : 0.4;
              return (
                <Image
                  style={{
                    width: size + 11,
                    height: size + 11,
                    opacity: focusedOpacity,
                    tintColor: dark ? 'white' : 'black',
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
              const focusedOpacity = focused ? 1.0 : 0.4;
              return (
                <Image
                  style={{
                    width: size + 11,
                    height: size + 11,
                    opacity: focusedOpacity,
                    tintColor: dark ? 'white' : 'black',
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
