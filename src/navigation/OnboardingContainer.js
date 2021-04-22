// public imports
import React, { useState, useEffect, createContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import remoteConfig from '@react-native-firebase/remote-config';

// custom imports
import { WelcomeScreen } from '../screens';
import {
  PhoneForm,
  NameForm,
  LinkBankForm,
  LinkBankCompleteForm,
  AdditionalForm,
  SetPasswordForm,
} from '../screens/onboarding';

const OnboardingStack = createStackNavigator();
export const OnboardingContext = createContext();

export const OnboardingContainer = () => {
  const theme = useTheme();

  //  signup values (phone, name, email, password)
  const [phone, setPhone] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const value = {
    phone,
    setPhone,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    institutions,
    setInstitutions,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
  };

  const [loginVariation, setLoginVariation] = useState(false);

  // retrieve remote config values for signup variation
  useEffect(() => {
    const variation = remoteConfig().getValue('signup_variation').asBoolean();
    console.log('Setting signup variation to ' + variation.toString());
    variation ? setLoginVariation(true) : setLoginVariation(false);
  }, []);

  return (
    <OnboardingContext.Provider value={value}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <OnboardingStack.Navigator
        initialRouteName="Welcome"
        headerMode="float"
        screenOptions={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
        }}>
        <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />
        <OnboardingStack.Screen name="Phone" component={PhoneForm} />
        <OnboardingStack.Screen name="Name" component={NameForm} />
        <OnboardingStack.Screen name="LinkBank" component={LinkBankForm} />
        <OnboardingStack.Screen
          name="LinkBankComplete"
          component={LinkBankCompleteForm}
        />
        <OnboardingStack.Screen
          name="AdditionalForm"
          component={AdditionalForm}
        />
        <OnboardingStack.Screen
          name="SetPassword"
          component={SetPasswordForm}
        />
      </OnboardingStack.Navigator>
    </OnboardingContext.Provider>
  );
};
