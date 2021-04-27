// public imports
import React, { useState, createContext } from 'react';
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
  PreviousNumberForm,
  ReturningUserForm,
  DateofBirthForm,
} from '../screens/onboarding';

const OnboardingStack = createStackNavigator();

const NewUserStack = createStackNavigator(); // case 1 : new user (new phone number, new deviceid)
const ExistingUserStack = createStackNavigator(); // case 2 : existing user (same phone number, same deviceid)
const DifferentPhoneNumberStack = createStackNavigator(); // case 3 : existing user (different phone number, same deviceid)
const DifferentDeviceIdStack = createStackNavigator(); // case 4 : existing user (same phone number, different deviceid)
const AccountRecoveryStack = createStackNavigator(); // case 5 : existing user (different phone number, different deviceid)

export const OnboardingContext = createContext();

export const OnboardingContainer = () => {
  const [onboardingCase, setOnboardingCase] = useState(0);
  const [phone, setPhone] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [oldUser, setOldUser] = useState(''); //see if user pressed "I already have an account"
  const value = {
    onboardingCase,
    setOnboardingCase,
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
    oldUser,
    setOldUser,
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
        headerMode="screen"
        screenOptions={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeftContainerStyle: { marginLeft: 8 },
        }}>
        <OnboardingStack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <OnboardingStack.Screen name="Phone" component={PhoneForm} />
        <OnboardingStack.Screen
          name="Name"
          component={NameForm}
          options={() => ({
            headerLeft: () => null,
          })}
        />
        <OnboardingStack.Screen
          name="DateofBirth"
          component={DateofBirthForm}
        />
        <OnboardingStack.Screen
          name="NewUser"
          component={NewUserFlow}
          options={{
            headerShown: false,
          }}
        />
        <OnboardingStack.Screen
          name="ExistingUser"
          component={ExistingUserFlow}
          options={{
            headerShown: false,
          }}
        />
        <OnboardingStack.Screen
          name="DifferentPhoneNumber"
          component={DifferentPhoneNumberFlow}
          options={{
            headerShown: false,
          }}
        />
        <OnboardingStack.Screen
          name="DifferentDeviceId"
          component={DifferentDeviceIdFlow}
          options={{
            headerShown: false,
          }}
        />
        <OnboardingStack.Screen
          name="AccountRecovery"
          component={AccountRecoveryFlow}
          options={{
            headerShown: false,
          }}
        />
      </OnboardingStack.Navigator>
    </OnboardingContext.Provider>
  );
};

// Case 1: new user (new phone number, new deviceid)
function NewUserFlow() {
  return (
    <NewUserStack.Navigator
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerTransparent: true,
      }}>
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
//      <NewUserStack.Screen name="AdditionalForm" component={AdditionalForm} />
// Case 2: existing user (same phone number, same deviceid)
function ExistingUserFlow() {
  return (
    <ExistingUserStack.Navigator
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerTransparent: true,
      }}>
      <ExistingUserStack.Screen
        name="ReturningUser"
        component={ReturningUserForm}
      />
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
