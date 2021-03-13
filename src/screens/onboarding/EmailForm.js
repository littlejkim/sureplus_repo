// public imports
import React, { useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';

export default function EmailForm({ navigation }) {
  const theme = useTheme();

  const { email, setEmail } = useContext(SignUpContext);

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
          clearButtonMode="while-editing"
          onChangeText={(value) => {
            setEmail(value);
          }}
          textAlign="center"
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.mainButton,
            { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
          ]}
          onPress={() => navigation.navigate('Password')}
          activeOpacity={0.7}>
          <Text style={[styles.mainButtonText, { color: theme.colors.text }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
