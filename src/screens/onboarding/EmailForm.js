// public imports
import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextField } from 'rn-material-ui-textfield';
import { API, Auth } from 'aws-amplify';

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
  focusEmail,
  unfocusEmail,
  scrollEnd,
  setScrollEnd,
}) {
  const { firstname } = useContext(OnboardingContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [error, setError] = useState(false);
  const [text, setText] = useState(null);
  const textinputRef = useRef();

  const theme = useTheme();

  useEffect(() => {
    displayError && error
      ? setErrorMsg('Please enter a valid email address')
      : setErrorMsg(null);
    if (focusEmail && scrollEnd) {
      textinputRef.current.focus();
      unfocusEmail();
      setScrollEnd();
    }
  }, [
    setErrorMsg,
    displayError,
    text,
    focusEmail,
    scrollEnd,
    setScrollEnd,
    unfocusEmail,
  ]);

  const _dupCheck = (textValue) => {
    let check = false;
    API.post('twilioapi', '/email/check', {
      body: { email: textValue },
    })
      .then((res) => (check = res.isTaken)) // this value will be boolean
      .catch((err) => console.log('/test/sms err: ', err));
    return check;
  };

  const onTextInput = (textValue) => {
    eraseError();
    setText(textValue);
    if (!string().email().required().isValidSync(textValue)) {
      invalidEmail();
      setError(true);
      return;
    }
    if (_dupCheck(textValue)) {
      invalidEmail();
      setError(true);
      return;
    }
    setError(false);
    validEmail();
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
          ref={textinputRef}
          label="Email"
          keyboardAppearance={theme.dark ? 'dark' : 'light'}
          tintColor={PRIMARY_COLOR}
          error={errorMsg}
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
          autoFocus={false}
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
