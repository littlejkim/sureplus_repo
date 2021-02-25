// public imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// custom imports
import { OnboardingScreen, LogInScreen, SignUpScreen } from '../screens';

const AuthStack = createStackNavigator();

export const AuthContainer = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="LogIn" component={LogInScreen} />
    </AuthStack.Navigator>
  );
};
