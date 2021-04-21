// public imports
import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextField } from 'rn-material-ui-textfield';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { ERROR_COLOR, PRIMARY_COLOR } from '../../styles/constants';
import { string } from 'yup';

export default function UsernameForm({
  screenHeight,
  displayError,
  eraseError,
  validUsername,
  invalidUsername,
  focusUsername,
  unfocusUsername,
  scrollEnd,
  setScrollEnd,
}) {
  const theme = useTheme();
  const [text, setText] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const textinputRef = useRef();

  const theme = useTheme();

  useEffect(() => {
    displayError ? setUsernameError(errorMsg) : setUsernameError(null);
    if (focusUsername && scrollEnd) {
      textinputRef.current.focus();
      unfocusUsername();
      setScrollEnd();
    }
  }, [
    errorMsg,
    setUsernameError,
    displayError,
    focusUsername,
    scrollEnd,
    setScrollEnd,
    unfocusUsername,
  ]);

  /*
  For now username checks for 
  1. If it consists only of alphnumerals, underscore and period
  2. checks if its length is at least 6 characters
  3. checks if it ends with a period
  4. checks if there are more than 2 consecutive periods
*/
  const manageTextInput = (textValue) => {
    eraseError();
    setText(textValue);
    if (
      !string()
        .matches(/^[ A-Za-z0-9_.]*$/)
        .isValidSync(textValue)
    ) {
      setErrorMsg(
        'Usernames can only use letters, numbers, underscores and periods.',
      );
      invalidUsername();
      return;
    }

    if (!string().min(6).isValidSync(textValue)) {
      setErrorMsg('Your username should have a minimum of 6 characters.');
      invalidUsername();
      return;
    }
    if (string().matches(/[.]$/).isValidSync(textValue)) {
      setErrorMsg("You can't end your username with as a period");
      invalidUsername();
      return;
    }
    if (
      !string()
        .matches(/^(?!.*?[._]{2})[a-zA-Z0-9_.]+$/)
        .isValidSync(textValue)
    ) {
      setErrorMsg("You can't have more than one period in a row");
      invalidUsername();
      return;
    }
    setErrorMsg(null);
    validUsername();
  };
  return (
    <View style={{ height: screenHeight }}>
      <Text style={[styles.titleText, { color: theme.colors.title }]}>
        Create username
      </Text>
      <Text style={[styles.bodyText, { color: theme.colors.title }]}>
        Choose a username for your new account. You can always change it later.
      </Text>
      <View style={{ marginTop: 40 }}>
        <TextField
          label="Username"
          keyboardAppearance={theme.dark ? 'dark' : 'light'}
<<<<<<< HEAD
          tintColor={errorMsg && displayError ? ERROR_COLOR : PRIMARY_COLOR}
          lineWidth={2}
          disabledLineWidth={2}
          fontSize={24}
          labelFontSize={14}
=======
          tintColor={PRIMARY_COLOR}
          error={usernameError}
          errorColor={ERROR_COLOR}
          labelFontSize={20}
          fontSize={25}
>>>>>>> maro_branch
          autoCapitalize="none"
          autoCompleteType="off"
          keyboardType="ascii-capable"
          textContentType="none"
          maxLength={12}
          autoCorrect={false}
          autoFocus={false}
          clearButtonMode="while-editing"
          enablesReturnKeyAutomatically={true}
          blurOnSubmit={false}
          returnKeyType="done"
          onChangeText={manageTextInput}
          value={text}
          ref={textinputRef}
        />
      </View>
    </View>
  );
}
