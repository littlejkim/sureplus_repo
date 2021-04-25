// public imports
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/welcome.styles';
import { HomeCarousel } from '../components/HomeCarousel';

export default function WelcomeScreen({ navigation }) {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.body, { paddingHorizontal: 0 }]}>
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={[styles.titleText, { color: theme.colors.title }]}>
            Stress free subscription life
          </Text>
          <Text style={styles.bodyText}>
            Sureplus pays attention to your {'\n'}subscriptions so you don't
            have to
          </Text>
        </View>
        <HomeCarousel />
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
