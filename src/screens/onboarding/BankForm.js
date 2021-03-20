// public imports
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import RNRestart from 'react-native-restart'; // temporary restart module (might need to replace during production level)

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
import { storeUserToken } from '../../utils/userUtils';
import { testUserData } from '../../data/testUserData';

export default function BankForm({ navigation }) {
  const theme = useTheme();

  const _continue = () => {
    storeUserToken(testUserData).then(RNRestart.Restart());
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Connect your bank to view subscriptions.
        </Text>
        <Text style={styles.bodyText}>
          We analyze your bank statement to track down subscriptions.
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.mainButton,
            { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
          ]}
          onPress={_continue}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Connect my bank</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
