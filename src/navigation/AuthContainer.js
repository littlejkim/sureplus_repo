// public imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// custom imports
import { OnboardingScreen, RegisterScreen, SignInScreen } from '../screens';

const AuthStack = createStackNavigator();

export const AuthContainer = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
    </AuthStack.Navigator>
  );
};
