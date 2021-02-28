// public imports
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import { TEXT_BOLD, TEXT_REGULAR } from '../styles/constants';
import styles from '../styles/onboarding.styles';
import { LoadingSpinner } from '../components/LoadingSpinner';
export default function SignUpScreen() {
  const { colors, dark } = useTheme();

  const [loading, setLoading] = useState(false); // used to show loading spinner
  const [email, setEmail] = useState();

  // wait for email verification
  const verifyEmail = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  return (
    <View style={styles.container}>
      <LoadingSpinner loading={loading} />
      <View style={styles.body}>
        <Text
          style={[
            styles.titleText,
            {
              color: colors.mainText,
            },
          ]}>
          Enter email address
        </Text>
        <View
          style={{
            width: '80%',
            marginTop: 30,
          }}>
          <TextInput
            keyboardAppearance={dark ? 'dark' : 'light'}
            style={[styles.textInput, { color: colors.mainText }]}
            autoCapitalize="none"
            selectionColor={colors.primary}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            maxLength={320}
            autoCorrect={false}
            autoFocus={true}
            clearButtonMode="while-editing"
            onChangeText={(text) => setEmail(text)}
            onEndEditing={() => console.log(email)}
            textAlign="center"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.mainButton,
            { backgroundColor: colors.primary }, // check android margin bottom for footer
          ]}
          onPress={verifyEmail}
          activeOpacity={0.7}>
          <Text style={[styles.mainButtonText, { color: colors.text }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
