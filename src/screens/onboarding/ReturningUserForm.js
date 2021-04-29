/* eslint-disable react-native/no-inline-styles */
// public imports
import React, { useContext } from 'react';
import { View, Text, Platform, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { OnboardingContext } from '../../navigation/OnboardingContainer';
import { TEXT_REGULAR } from '../../styles/fonts';

export default function ReturningUserForm({ navigation }) {
  const { firstname, lastname, username, onboardingCase } = useContext(
    OnboardingContext,
  );
  const theme = useTheme();
  const pressContinue = () => {
    if (onboardingCase === 2) {
      navigation.navigate('PreviousNumber');
    } else {
      navigation.navigate('EnterEmail');
    }
  };
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-35}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Are you a returning user?
        </Text>
        <Text style={styles.bodyText}>
          Your device is already registered in our{'\n'}system.
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            borderRadius: 14,
            borderColor: '#ACB5BE',
            width: 327,
            height: 62,
            elevation: 5, // shadow on Android
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            top: 48,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={{
                resizeMode: 'contain',
                width: 40,
                left: 14,
              }}
            />
            <Text
              style={{
                fontFamily: TEXT_REGULAR,
                fontWeight: '400',
                fontSize: 17,
                lineHeight: 23,
                letterSpacing: -0.041,
                left: 30,
              }}>
              {firstname} {lastname}
              <Text style={{ color: '#6B7583' }}> @{username}</Text>
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.subButton}
          onPress={() => navigation.navigate('NewUser')}
          activeOpacity={0.5}>
          <Text style={[styles.subButtonText, { color: theme.colors.primary }]}>
            No, I'm new here
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => pressContinue()}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Continue as {firstname}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
//navigation.navigate('PreviousNumber')
