// public imports
import React, { useState, createContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import remoteConfig from '@react-native-firebase/remote-config';

// custom imports
import {
  PhoneForm,
  NameForm,
  LinkBankForm,
  LinkBankComplete,
  EmailForm,
  UsernameForm,
  CompleteForm,
} from './onboarding';
import { MainModal } from '../components/MainModal';

const SignUpStack = createStackNavigator(); // signup stack
export const SignUpContext = createContext(); // signup context (used to store email, phonenumber, name, etc)

export default function SignUpScreen({ navigation }) {
  const [modal, setModal] = useState(false);

  //  signup values (phone, name, email, password)
  const [phone, setPhone] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
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

  const _modal = () => {
    setModal(!modal);
  };

  return (
    <SignUpContext.Provider value={value}>
      {loginVariation ? (
        // default variation
        <SignUpStack.Navigator
          initialRouteName="Phone"
          screenOptions={{
            headerShown: false,
          }}>
          <SignUpStack.Screen name="Phone" component={PhoneForm} />
          <SignUpStack.Screen name="Name" component={NameForm} />
          <SignUpStack.Screen name="Bank" component={LinkBankForm} />
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
          <SignUpStack.Screen name="LinkBank" component={LinkBankForm} />
          <SignUpStack.Screen
            name="LinkBankComplete"
            component={LinkBankComplete}
          />
          <SignUpStack.Screen name="Email" component={EmailForm} />
          <SignUpStack.Screen name="Username" component={UsernameForm} />
          <SignUpStack.Screen name="Complete" component={CompleteForm} />
        </SignUpStack.Navigator>
      )}
    </SignUpContext.Provider>
  );
}
