// public imports
import React, { useState, createContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

// custom imports
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmailForm, PasswordForm, PhoneForm, CompleteForm } from './onboarding';
import { MainModal } from '../components/MainModal';
import remoteConfig from '@react-native-firebase/remote-config';

const SignUpStack = createStackNavigator(); // signup stack
export const SignUpContext = createContext(); // signup context (used to store email, phonenumber, name, etc)

export default function SignUpScreen({ navigation }) {
  const [loading, setLoading] = useState(false); // used to show loading spinner

  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const value = { email, setEmail, password, setPassword, phone, setPhone };

  // check for variation
  useEffect(() => {
    const variation = remoteConfig().getValue('signup'); // retrieve remote config values for signup variation

    console.log(variation.asString());
    if (variation.asBoolean() === true) {
      console.log('Variation is enabled');
    } else {
      console.log('Default variation is enabled');
    }
  }, []);
  const _modal = () => {
    setModal(!modal);
  };

  return (
    <SignUpContext.Provider value={value}>
      <MainModal visible={modal} hide={_modal} />
      <LoadingSpinner loading={loading} />
      <SignUpStack.Navigator
        initialRouteName="Phone"
        screenOptions={{
          headerShown: false,
        }}>
        <SignUpStack.Screen name="Phone" component={PhoneForm} />
        <SignUpStack.Screen name="Email" component={EmailForm} />
        <SignUpStack.Screen name="Password" component={PasswordForm} />
        <SignUpStack.Screen name="Complete" component={CompleteForm} />
      </SignUpStack.Navigator>
    </SignUpContext.Provider>
  );
}
