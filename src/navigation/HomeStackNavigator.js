// public imports
import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// custom imports
import { HomeScreen, RegisterScreen, SignInScreen } from '../components';

const HomeStack = createStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Onboarding">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Home',
          headerLeft: () => (
            <Button onPress={() => alert('This is a button!')} title="Menu" />
          ),
        }}
      />
      <HomeStack.Screen name="Profile" component={RegisterScreen} />
      <HomeStack.Screen name="Profiles" component={SignInScreen} />
    </HomeStack.Navigator>
  );
};
