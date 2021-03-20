// public imports
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';

export default function BankForm({ navigation }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.titleText}>
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
          onPress={() => console.log('Linking bank')}
          activeOpacity={0.7}>
          <Text style={[styles.mainButtonText, { color: theme.colors.text }]}>
            Connect my bank
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
