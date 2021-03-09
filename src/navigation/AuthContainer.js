// public imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import { WelcomeScreen, LogInScreen, SignUpScreen } from '../screens';

const AuthStack = createStackNavigator();

export const AuthContainer = () => {
  const { dark } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <AuthStack.Navigator
        mode="modal"
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Onboarding" component={WelcomeScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        <AuthStack.Screen name="LogIn" component={LogInScreen} />
      </AuthStack.Navigator>
    </View>
  );
};
