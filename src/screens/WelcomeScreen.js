/* eslint-disable no-sequences */
/* eslint-disable react-native/no-inline-styles */
// public imports
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/welcome.styles';
import { HomeCarousel } from '../components/HomeCarousel';
import { OnboardingContext } from '../navigation/OnboardingContainer';

export default function WelcomeScreen({ navigation }) {
  const { setOldUser } = useContext(OnboardingContext);
  const [background, setBackground] = useState(false);

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
        <Pressable
          style={[
            styles.subButton,
            { backgroundColor: background ? '#F7F7F7' : 'white' },
          ]}
          onPressIn={() => setBackground(true)}
          onPressOut={() => setBackground(false)}
          onPress={() => {
            setOldUser(true);
            navigation.navigate('Phone');
          }}
          TouchableOpacity={1.0}>
          <Text style={[styles.subButtonText, { color: theme.colors.primary }]}>
            I already have an account
          </Text>
        </Pressable>
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
