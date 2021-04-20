// public imports
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextField } from 'rn-material-ui-textfield';

// custom imports
import { OnboardingContext } from '../../navigation/OnboardingContainer';
import styles from '../../styles/welcome.styles';
import { PRIMARY_COLOR, ERROR_COLOR } from '../../styles/constants';
import { string } from 'yup';

export default function EmailForm({
  screenHeight,
  validEmail,
  invalidEmail,
  displayError,
  eraseError,
}) {
  const { firstname } = useContext(OnboardingContext);
  const [emailError, setEmailError] = useState(null);
  const [text, setText] = useState(null);

  const theme = useTheme();
  useEffect(() => {
    displayError && !string().email().required().isValidSync(text)
      ? setEmailError('Please enter a valid email address')
      : setEmailError(null);
  });

  const onTextInput = (textValue) => {
    eraseError();
    setText(textValue);
    if (string().email().required().isValidSync(textValue)) {
      validEmail();
    } else {
      invalidEmail();
    }
  };

  return (
    <View style={{ height: screenHeight }}>
      <Text
        style={[
          styles.bodyText,
          { color: theme.dark ? 'white' : 'black', marginBottom: 52 },
        ]}>
        <Text>Hi </Text>
        <Text style={{ color: PRIMARY_COLOR, fontWeight: '600' }}>
          {firstname}, {'\n'}
        </Text>
        <Text>Please complete your sign up to review your subscriptions!</Text>
      </Text>
      <Text style={[styles.titleText, { color: theme.colors.title }]}>
        What is your email?
      </Text>
      <View style={{ marginTop: 40 }}>
        <TextField
          label="Email"
          keyboardAppearance={theme.dark ? 'dark' : 'light'}
          tintColor={PRIMARY_COLOR}
          error={emailError}
          errorColor={ERROR_COLOR}
          labelFontSize={20}
          fontSize={25}
          autoCapitalize="none"
          selectionColor={PRIMARY_COLOR}
          autoCompleteType="off"
          keyboardType="email-address"
          textContentType="emailAddress"
          maxLength={40}
          autoCorrect={false}
          autoFocus={true}
          clearButtonMode="while-editing"
          enablesReturnKeyAutomatically={true}
          blurOnSubmit={true}
          returnKeyType="next"
          onChangeText={onTextInput}
          value={text}
        />
      </View>
    </View>
  );
}
