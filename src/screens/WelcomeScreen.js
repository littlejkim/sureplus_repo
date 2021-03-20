// public imports
import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import RNRestart from 'react-native-restart'; // temporary restart module (might need to replace during production level)
import { useTheme } from '@react-navigation/native';
import TouchID from 'react-native-touch-id';

// custom imports
import styles from '../styles/welcome.styles';
import { storeUserToken } from '../utils/userUtils';
import { testUserData } from '../data/testUserData';

export default function WelcomeScreen({ navigation }) {
  const theme = useTheme();
  // sign in action
  const _onSignUp = () => {
    navigation.navigate('SignUp');
  };

  // log in action
  const _onLogIn = () => {
    TouchID.authenticate('to demo this react-native component')
      .then((success) => {
        console.log('Authenticated Successfully'),
          storeUserToken(testUserData).then(RNRestart.Restart());
      })
      .catch((error) => {
        Alert.alert('user not correct');
      });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Stress free subscription life
        </Text>
        <Text style={styles.bodyText}>
          Sureplus pays attention to your subscriptions so you don't have to
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={_onSignUp}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Get Started</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.subButton}
          onPress={_onLogIn}
          activeOpacity={0.5}>
          <Text style={[styles.subButtonText, { color: 'black' }]}>
            Already a member?{' '}
          </Text>
          <Text style={[styles.subButtonText, { color: 'black' }]}>Log in</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
