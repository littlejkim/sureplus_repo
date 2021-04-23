// public imports
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/welcome.styles';

export default function WelcomeScreen({ navigation }) {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Stress free subscription life
        </Text>
        <Text style={styles.bodyText}>
          Sureplus pays attention to your {'\n'}subscriptions so you don't have
          to
        </Text>
        <Image
          source={require('../assets/images/GetStartedIllustration.png')}
          style={{
            top: 80,
            width: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.subButton}
          onPress={() => console.log('already have account')}
          activeOpacity={0.5}>
          <Text style={[styles.subButtonText, { color: theme.colors.primary }]}>
            I already have an account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => navigation.navigate('Phone')}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
