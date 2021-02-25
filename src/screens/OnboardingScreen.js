// public imports
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// custom imports
import styles from '../styles/onboarding.styles';
import { storeUserToken } from '../utils/userUtils';
import { testUserData } from '../data/testUserData';
import { TEXT_BOLD } from '../styles/constants';

export default function OnboardingScreen({ navigation }) {
  // sign in action
  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  // log in action
  const onLogIn = () => {
    storeUserToken(testUserData);
    alert('Signing in');
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          style={{ aspectRatio: 2.5, resizeMode: 'contain' }}
          source={require('../assets/images/logo_long.png')}
        />
      </View>
      <View style={[styles.footer]}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={onSignUp}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subButton}
          onPress={onLogIn}
          activeOpacity={0.5}>
          <Text style={styles.subButtonText}>Already a member? </Text>
          <Text style={[styles.subButtonText, { fontFamily: TEXT_BOLD }]}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
