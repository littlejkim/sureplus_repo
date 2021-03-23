// public imports
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import RNRestart from 'react-native-restart'; // temporary restart module (might need to replace during production level)
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';

import { storeUserToken } from '../../utils/userUtils';
import { testUserData } from '../../data/testUserData';

export default function LinkBankCompleteForm({ navigation }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Link Complete!
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => console.log('pressed link another bank')}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subButton}
          onPress={() => console.log('pressed home')}
          activeOpacity={0.5}>
          <Text style={[styles.subButtonText, { color: theme.colors.primary }]}>
            Connect another bank
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
