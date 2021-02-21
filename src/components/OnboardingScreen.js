// public imports
import React from 'react';
import { View, Text, Button } from 'react-native';

// custom imports
import styles from '../styles/container.styles';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
}
