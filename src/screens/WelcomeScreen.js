// public imports
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/welcome.styles';

export default function WelcomeScreen({ navigation }) {
  const theme = useTheme();

  const _onSignUp = () => {
    navigation.navigate('SignUp');
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
