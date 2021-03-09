// public imports
import React, { useState, createContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/welcome.styles';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmailForm } from '../components/EmailForm';
import { PhoneForm } from '../components/PhoneForm';

const SignUpStack = createStackNavigator(); // signup stack
export const SignUpContext = createContext(); // signup context (used to store email, phonenumber, name, etc)

export default function SignUpScreen({ navigation }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false); // used to show loading spinner

  const [email, setEmail] = useState(''); // set email
  const [phone, setPhone] = useState('');
  const value = { email, setEmail, phone, setPhone };

  // wait for email verification
  const next = () => {
    navigation.navigate('Phone');
  };

  return (
    <SignUpContext.Provider value={value}>
      <View style={styles.container}>
        <LoadingSpinner loading={loading} />
        <SignUpStack.Navigator
          initialRouteName="Email"
          screenOptions={{
            headerShown: false,
          }}>
          <SignUpStack.Screen name="Email" component={EmailForm} />
          <SignUpStack.Screen name="Phone" component={PhoneForm} />
        </SignUpStack.Navigator>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.mainButton,
              { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
            ]}
            onPress={next}
            activeOpacity={0.7}>
            <Text style={[styles.mainButtonText, { color: theme.colors.text }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SignUpContext.Provider>
  );
}
