/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useContext, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { OnboardingContext } from '../../navigation/OnboardingContainer';
import { TEXT_REGULAR } from '../../styles/fonts';

export default function LoginCompleteForm({ navigation }) {
  const { firstname, lastname, username } = useContext(OnboardingContext);
  const titleFadeIn = useRef(new Animated.Value(0)).current;
  const bodyFadeIn = useRef(new Animated.Value(0)).current;
  const imageFadeIn = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  useEffect(() => {
    Animated.timing(titleFadeIn, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      Animated.timing(bodyFadeIn, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, 1500);
    setTimeout(() => {
      Animated.timing(imageFadeIn, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, 3000);
  }, [titleFadeIn, bodyFadeIn, imageFadeIn]);

  return (
    <Animated.View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.Text
        style={StyleSheet.compose(styles.bodyText, {
          opacity: titleFadeIn,
          top: titleFadeIn.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, -30],
          }),
        })}>
        Login Complete!
      </Animated.Text>
      <Animated.Text
        style={StyleSheet.compose(styles.titleText, {
          color: theme.colors.title,
          textAlign: 'center',
          paddingTop: 12,
          opacity: bodyFadeIn,
          top: bodyFadeIn.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, -30],
          }),
        })}>
        Glad to have you back,{'\n'}Jinjae!
      </Animated.Text>
      <Animated.View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          borderRadius: 12,
          borderColor: '#DDDDDD',
          borderWidth: 1,
          width: 327,
          height: 62,
          elevation: 5, // shadow on Android
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          opacity: imageFadeIn,
          top: imageFadeIn.interpolate({
            inputRange: [0, 1],
            outputRange: [12, -12],
          }),
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
      </Animated.View>
    </Animated.View>
  );
}
