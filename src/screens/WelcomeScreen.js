// public imports
import React, { useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/welcome.styles';
import { TEXT_REGULAR } from '../styles/fonts';

import { HomeCarousel } from '../components/HomeCarousel';
import { OnboardingContext } from '../navigation/OnboardingContainer';

export default function WelcomeScreen({ navigation }) {
  const { oldUser, setOldUser } = useContext(OnboardingContext);
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
          style={{
            backgroundColor: oldUser ? '#F7F7F7' : 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            borderRadius: 30,
          }}
          onPress={() => (setOldUser(true), navigation.navigate('Phone'))}
          activeOpacity={0.5}>
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: 17,
              fontWeight: '600',
              lineHeight: 22,
              marginVertical: 17,
              fontFamily: TEXT_REGULAR,
            }}>
            I already have an account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => (setOldUser(false), navigation.navigate('Phone'))}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
