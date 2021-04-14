// public imports
import React, { useState, createContext, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import remoteConfig from '@react-native-firebase/remote-config';

// custom imports
import {
  PhoneForm,
  NameForm,
  LinkBankForm,
  LinkBankCompleteForm,
  AdditionalForm,
  SetPasswordForm,
} from './onboarding';

const ChangedNumberStack = createStackNavigator(); // signup stack
export const ChangedNumberContext = createContext(); // signup context (used to store email, phonenumber, name, etc)

export default function ChangedNumberScreen({ navigation }) {
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>temporary</Text>
      <Button title="Back" onPress={() => navigation.pop()}></Button>
    </View>
    // <ChangedNumberContext.Provider value={value}>
    //   <ChangedNumberStack.Navigator
    //     initialRouteName="Phone"
    //     headerMode="float"
    //     screenOptions={{
    //       headerTitle: '',
    //       headerBackTitleVisible: false,
    //       headerTransparent: true,
    //     }}>
    //     <ChangedNumberStack.Screen name="Phone" component={PhoneForm} />
    //     <ChangedNumberStack.Screen name="Name" component={NameForm} />
    //     <ChangedNumberStack.Screen name="LinkBank" component={LinkBankForm} />
    //     <ChangedNumberStack.Screen
    //       name="LinkBankComplete"
    //       component={LinkBankCompleteForm}
    //     />
    //     <ChangedNumberStack.Screen
    //       name="AdditionalForm"
    //       component={AdditionalForm}
    //     />
    //     <ChangedNumberStack.Screen
    //       name="SetPassword"
    //       component={SetPasswordForm}
    //     />
    //   </ChangedNumberStack.Navigator>
    // </ChangedNumberContext.Provider>
  );
}
