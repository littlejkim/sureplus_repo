// public imports
import React, { useState, useEffect, createContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import remoteConfig from '@react-native-firebase/remote-config';

// custom imports
import { WelcomeScreen } from '../screens';
import {
  PhoneForm,
  NameForm,
  LinkBankForm,
  LinkBankCompleteForm,
  AdditionalForm,
  EnterPasswordForm,
  SetPasswordForm,
  EnterEmailForm,
  VerificationLinkForm,
  PreviousPhoneForm,
  ReturningUserForm,
} from '../screens/onboarding';

const OnboardingStack = createStackNavigator();

const NewUserStack = createStackNavigator(); // case 1 : new user (new phone number, new deviceid)
const ExistingUserStack = createStackNavigator(); // case 2 : existing user (same phone number, same deviceid)
const DifferentPhoneNumberStack = createStackNavigator(); // case 3 : existing user (different phone number, same deviceid)
const DifferentDeviceIdStack = createStackNavigator(); // case 4 : existing user (same phone number, different deviceid)
const AccountRecoveryStack = createStackNavigator(); // case 5 : existing user (different phone number, different deviceid)

export const OnboardingContext = createContext();

export const OnboardingContainer = () => {
  //  context values (phone, name, email, password)
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

  // retrieve remote config values for signup variation
  // const [loginVariation, setLoginVariation] = useState(false);
  // useEffect(() => {
  //   const variation = remoteConfig().getValue('signup_variation').asBoolean();
  //   console.log('Setting signup variation to ' + variation.toString());
  //   variation ? setLoginVariation(true) : setLoginVariation(false);
  // }, []);

  return (
    <OnboardingContext.Provider value={value}>
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
        <OnboardingStack.Screen name="NewUser" component={NewUserFlow} />
        <OnboardingStack.Screen
          name="ExistingUser"
          component={ExistingUserFlow}
        />
        <OnboardingStack.Screen
          name="DifferentPhoneNumber"
          component={DifferentPhoneNumberFlow}
        />
        <OnboardingStack.Screen
          name="DifferentDeviceId"
          component={DifferentDeviceIdFlow}
        />
        <OnboardingStack.Screen
          name="AccountRecovery"
          component={AccountRecoveryFlow}
        />
      </OnboardingStack.Navigator>
    </OnboardingContext.Provider>
  );
};

// Case 1: new user (new phone number, new deviceid)
function NewUserFlow() {
  return (
    <NewUserStack.Navigator
      headerMode="none"
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerTransparent: true,
      }}>
      <NewUserStack.Screen name="Name" component={NameForm} />
      <NewUserStack.Screen name="LinkBank" component={LinkBankForm} />
      <NewUserStack.Screen
        name="LinkBankComplete"
        component={LinkBankCompleteForm}
      />
      <NewUserStack.Screen name="AdditionalForm" component={AdditionalForm} />
      <NewUserStack.Screen name="SetPassword" component={SetPasswordForm} />
    </NewUserStack.Navigator>
  );
}

// Case 2: existing user (same phone number, same deviceid)
function ExistingUserFlow() {
  return (
    <ExistingUserStack.Navigator
      headerMode="none"
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerTransparent: true,
      }}>
      <ExistingUserStack.Screen name="EnterEmail" component={EnterEmailForm} />
      <ExistingUserStack.Screen
        name="VerificationLink"
        component={VerificationLinkForm}
      />
      <ExistingUserStack.Screen
        name="EnterPassword"
        component={EnterPasswordForm}
      />
    </ExistingUserStack.Navigator>
  );
}

// Case 3: existing user (different phone number, same deviceid)
function DifferentPhoneNumberFlow() {
  return (
    <DifferentPhoneNumberStack.Navigator
      headerMode="none"
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerTransparent: true,
      }}>
      <DifferentPhoneNumberStack.Screen
        name="ReturningUser"
        component={ReturningUserForm}
      />
      <DifferentPhoneNumberStack.Screen
        name="PreviousNumber"
        component={PreviousNumberForm}
      />
      <DifferentPhoneNumberStack.Screen
        name="EnterEmail"
        component={EnterEmailForm}
      />
      <DifferentPhoneNumberStack.Screen
        name="VerificationLink"
        component={VerificationLinkForm}
      />
      <DifferentPhoneNumberStack.Screen
        name="EnterPassword"
        component={EnterPasswordForm}
      />
    </DifferentPhoneNumberStack.Navigator>
  );
}

// Case 4: existing user (same phone number, different deviceid)
function DifferentDeviceIdFlow() {
  return (
    <DifferentDeviceIdStack.Navigator
      headerMode="none"
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerTransparent: true,
      }}>
      <DifferentDeviceIdStack.Screen
        name="ReturningUser"
        component={ReturningUserForm}
      />
      <DifferentDeviceIdStack.Screen
        name="EnterEmail"
        component={EnterEmailForm}
      />
      <DifferentDeviceIdStack.Screen
        name="VerificationLink"
        component={VerificationLinkForm}
      />
      <DifferentPhoneNumberStack.Screen
        name="EnterPassword"
        component={EnterPasswordForm}
      />
    </DifferentDeviceIdStack.Navigator>
  );
}

// Case 5: existing user (different phone number, different deviceid)
function AccountRecoveryFlow() {
  return (
    <AccountRecoveryStack.Navigator
      headerMode="none"
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerTransparent: true,
      }}>
      <AccountRecoveryStack.Screen
        name="PreviousNumber"
        component={PreviousNumberForm}
      />
      <AccountRecoveryStack.Screen
        name="EnterEmail"
        component={EnterEmailForm}
      />
      <AccountRecoveryStack.Screen
        name="VerificationLink"
        component={VerificationLinkForm}
      />
      <AccountRecoveryStack.Screen
        name="EnterPassword"
        component={EnterPasswordForm}
      />
    </AccountRecoveryStack.Navigator>
  );
}
