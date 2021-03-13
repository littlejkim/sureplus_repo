// public imports
import React, { useState, createContext } from 'react';
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
import styles from '../styles/welcome.styles';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmailForm, PasswordForm, PhoneForm } from '../components/onboarding';
import { MainModal } from '../components/MainModal';

const SignUpStack = createStackNavigator(); // signup stack
export const SignUpContext = createContext(); // signup context (used to store email, phonenumber, name, etc)

export default function SignUpScreen({ navigation }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false); // used to show loading spinner

  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const value = { email, setEmail, password, setPassword, phone, setPhone };

  const _modal = () => {
    setModal(!modal);
  };

  return (
    <SignUpContext.Provider value={value}>
      <MainModal visible={modal} hide={_modal} />
      <LoadingSpinner loading={loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <SignUpStack.Navigator
          initialRouteName="Phone"
          screenOptions={{
            headerShown: false,
          }}>
          <SignUpStack.Screen name="Phone" component={PhoneForm} />

          <SignUpStack.Screen name="Email" component={EmailForm} />
          <SignUpStack.Screen name="Password" component={PasswordForm} />
        </SignUpStack.Navigator>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.mainButton,
              { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
            ]}
            onPress={_modal}
            activeOpacity={0.7}>
            <Text style={[styles.mainButtonText, { color: theme.colors.text }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SignUpContext.Provider>
  );
}
