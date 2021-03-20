// public imports
import React, { useState, createContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import remoteConfig from '@react-native-firebase/remote-config';

// custom imports
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PhoneForm, NameForm, BankForm } from './onboarding';
import { MainModal } from '../components/MainModal';

const SignUpStack = createStackNavigator(); // signup stack
export const SignUpContext = createContext(); // signup context (used to store email, phonenumber, name, etc)

export default function SignUpScreen({ navigation }) {
  const [loading, setLoading] = useState(false); // used to show loading spinner

  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loginVariation, setLoginVariation] = useState();
  const value = { email, setEmail, password, setPassword, phone, setPhone };

  // check for variation
  useEffect(() => {
    const variation = remoteConfig().getValue('signup_variation').asBoolean(); // retrieve remote config values for signup variation
    console.log('Setting signup variation to ' + variation.toString());
    variation ? setLoginVariation(true) : setLoginVariation(false);
  }, []);

  const _modal = () => {
    setModal(!modal);
  };

  return (
    <SignUpContext.Provider value={value}>
      <MainModal visible={modal} hide={_modal} />
      <LoadingSpinner loading={loading} />
      {loginVariation ? (
        // default variation
        <SignUpStack.Navigator
          initialRouteName="Phone"
          screenOptions={{
            headerShown: false,
          }}>
          <SignUpStack.Screen name="Phone" component={PhoneForm} />
          <SignUpStack.Screen name="Name" component={NameForm} />
          <SignUpStack.Screen name="Bank" component={BankForm} />
        </SignUpStack.Navigator>
      ) : (
        // variation applied
        <SignUpStack.Navigator
          initialRouteName="Phone"
          screenOptions={{
            headerShown: false,
          }}>
          <SignUpStack.Screen name="Phone" component={PhoneForm} />
          <SignUpStack.Screen name="Name" component={NameForm} />
          <SignUpStack.Screen name="Bank" component={BankForm} />
        </SignUpStack.Navigator>
      )}
    </SignUpContext.Provider>
  );
}
