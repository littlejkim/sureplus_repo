// public imports
import React from 'react';
import { View, Text, Button } from 'react-native';

// custom imports
import styles from '../styles/container.styles';
import { storeUserToken } from '../utils/userUtils';
import { testUserData } from '../data/testUserData';

export default function OnboardingScreen({ navigation }) {
  // test signin button
  const onSignIn = () => {
    storeUserToken(testUserData);
  };

  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
}
