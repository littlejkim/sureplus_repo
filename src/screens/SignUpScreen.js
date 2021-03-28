// public imports
import React, { useState, createContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import remoteConfig from '@react-native-firebase/remote-config';

// custom imports
import {
  PhoneForm,
  PhoneTempForm,
  NameForm,
  LinkBankForm,
  LinkBankComplete,
  EmailForm,
  UsernameForm,
  ConfirmForm,
} from './onboarding';

const SignUpStack = createStackNavigator(); // signup stack
export const SignUpContext = createContext(); // signup context (used to store email, phonenumber, name, etc)

export default function SignUpScreen() {
  const [modal, setModal] = useState(false);

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

  const [loginVariation, setLoginVariation] = useState();

  // check for variation
  useEffect(() => {
    const variation = remoteConfig().getValue('signup_variation').asBoolean(); // retrieve remote config values for signup variation
    console.log('Setting signup variation to ' + variation.toString());
    variation ? setLoginVariation(true) : setLoginVariation(false);
  }, []);

  return (
    <SignUpContext.Provider value={value}>
      {loginVariation ? (
        <SignUpStack.Navigator
          initialRouteName="Phone"
          headerMode="float"
          screenOptions={{
            headerTitle: '',
            headerBackTitleVisible: false,
            headerTransparent: true,
          }}>
          <SignUpStack.Screen name="Phone" component={PhoneForm} />
          <SignUpStack.Screen name="Name" component={NameForm} />
          <SignUpStack.Screen name="LinkBank" component={LinkBankForm} />
          <SignUpStack.Screen
            name="LinkBankComplete"
            component={LinkBankComplete}
          />
          <SignUpStack.Screen name="Email" component={EmailForm} />
          <SignUpStack.Screen name="Username" component={UsernameForm} />
          <SignUpStack.Screen name="Confirm" component={ConfirmForm} />
        </SignUpStack.Navigator>
      ) : (
        // variation applied
        <SignUpStack.Navigator
          initialRouteName="PhoneTemp"
          headerMode="float"
          screenOptions={{
            headerTitle: '',
            headerBackTitleVisible: false,
            headerTransparent: true,
          }}>
          <SignUpStack.Screen name="PhoneTemp" component={PhoneTempForm} />
          <SignUpStack.Screen name="Name" component={NameForm} />
          <SignUpStack.Screen name="LinkBank" component={LinkBankForm} />
          <SignUpStack.Screen
            name="LinkBankComplete"
            component={LinkBankComplete}
          />
          <SignUpStack.Screen name="Email" component={EmailForm} />
          <SignUpStack.Screen name="Username" component={UsernameForm} />
          <SignUpStack.Screen name="Confirm" component={ConfirmForm} />
        </SignUpStack.Navigator>
      )}
    </SignUpContext.Provider>
  );
}
