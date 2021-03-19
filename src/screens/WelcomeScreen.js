// public imports
import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import RNRestart from 'react-native-restart'; // temporary restart module (might need to replace during production level)
import { useTheme } from '@react-navigation/native';
import TouchID from 'react-native-touch-id';

// custom imports
import styles from '../styles/welcome.styles';
import { TEXT_BOLD } from '../styles/fonts';
import { storeUserToken } from '../utils/userUtils';
import { testUserData } from '../data/testUserData';

export default function WelcomeScreen({ navigation }) {
  const { colors } = useTheme();
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
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.body}>
        <Image
          style={{
            aspectRatio: 2.5,
            resizeMode: 'contain',
          }}
          source={require('../assets/images/logo_long.png')}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.mainButton,
            { backgroundColor: 'white', marginVertical: 5 },
          ]}
          onPress={_onSignUp}
          activeOpacity={0.7}>
          <Text style={[styles.mainButtonText, { color: colors.primary }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subButton}
          onPress={_onLogIn}
          activeOpacity={0.5}>
          <Text style={[styles.subButtonText, { color: 'white' }]}>
            Already a member?{' '}
          </Text>
          <Text
            style={[
              styles.subButtonText,
              { color: 'white', fontFamily: TEXT_BOLD },
            ]}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
