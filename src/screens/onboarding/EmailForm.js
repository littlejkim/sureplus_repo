// public imports
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';

export default function EmailForm({ navigation }) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { email, setEmail } = useContext(SignUpContext);

  const _continue = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    await setTimeout(() => {
      setIsLoading(false);
      console.log('Email successfully sent');
    }, 3000);
    await setTimeout(() => {
      navigation.navigate('Password');
    }, 3000);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.body}>
        <Text
          style={[
            styles.titleText,
            {
              color: theme.colors.mainText,
              marginBottom: 30,
            },
          ]}>
          Enter email address
        </Text>
        <TextInput
          keyboardAppearance={theme.dark ? 'dark' : 'light'}
          style={[styles.textInput, { color: theme.colors.mainText }]}
          autoCapitalize="none"
          selectionColor={theme.colors.mainText}
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          maxLength={320}
          autoCorrect={false}
          autoFocus={true}
          clearButtonMode="always"
          onEndEditing={(value) => {
            setEmail(value);
          }}
          textAlign="center"
        />
      </View>
      <View style={styles.footer}>
        {!isLoading ? (
          <TouchableOpacity
            style={[
              styles.mainButton,
              { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
            ]}
            onPress={_continue}
            activeOpacity={0.7}>
            <Text style={[styles.mainButtonText, { color: theme.colors.text }]}>
              Next
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={[
              styles.mainButton,
              { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
            ]}>
            <ActivityIndicator size="small" color="white" />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
