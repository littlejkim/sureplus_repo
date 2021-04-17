// public imports
import React, { useContext, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextField } from 'react-native-material-textfield';

// custom imports
import { SignUpContext } from '../../screens/SignUpScreen';
import styles from '../../styles/welcome.styles';
import { PRIMARY_COLOR, ERROR_COLOR } from '../../styles/constants';
import { string } from 'yup';
import { FloatingTextInput } from '../../components/FloatingTextInput';

export default function EmailForm({
  screenHeight,
  validEmail,
  invalidEmail,
  displayError,
  eraseError,
}) {
  const { firstname } = useContext(SignUpContext);
  const [text, setText] = useState(null);

  const theme = useTheme();
  const manageTextInput = (textValue) => {
    eraseError();
    setText(textValue);
    {
      /* we can make more checks for emails, but for now used the default library from yup*/
    }
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
          tintColor={
            !string().email().required().isValidSync(text) && displayError
              ? ERROR_COLOR
              : PRIMARY_COLOR
          }
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
          onChangeText={manageTextInput}
          value={text}
        />
        <Text style={styles.feedbackText}>
          {string().email().required().isValidSync(text)
            ? ''
            : displayError
            ? 'Please enter a valid email address'
            : ''}
        </Text>
      </View>
    </View>
  );
}
