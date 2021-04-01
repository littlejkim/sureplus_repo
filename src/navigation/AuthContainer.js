// public imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import { WelcomeScreen, LogInScreen, SignUpScreen } from '../screens';
import { EmailForm } from '../screens/onboarding';

const AuthStack = createStackNavigator();

export const AuthContainer = () => {
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <AuthStack.Navigator
        mode="modal"
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Email" component={EmailForm} />

        <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        <AuthStack.Screen name="LogIn" component={LogInScreen} />
      </AuthStack.Navigator>
    </View>
  );
};
