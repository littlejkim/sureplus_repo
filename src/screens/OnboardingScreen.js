// public imports
import React from 'react';
import { View, Text, Button, Image } from 'react-native';

// custom imports
import styles from '../styles/container.styles';
import { storeUserToken } from '../utils/userUtils';
import { testUserData } from '../data/testUserData';

export default function OnboardingScreen({ navigation }) {
  // test signin button
  const onSignIn = () => {
    alert('Signing in');
    storeUserToken(testUserData);
  };

  return (
    <View style={styles.onboardingContainer}>
      <Image
        source={require('../assets/images/logo_long.png')}
        style={{ aspectRatio: 2.5, resizeMode: 'contain' }}
      />
    </View>
  );
}
