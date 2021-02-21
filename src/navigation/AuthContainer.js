// public imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// custom imports
import { OnboardingScreen, RegisterScreen, SignInScreen } from '../components';

const AuthStack = createStackNavigator();

export const AuthContainer = () => {
  return (
    <AuthStack.Navigator initialRouteName="Onboarding">
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
    </AuthStack.Navigator>
  );
};
