// public imports
import React, { useContext, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextField } from 'react-native-material-textfield';

// custom imports
import styles from '../../styles/welcome.styles';
import { ERROR_COLOR, PRIMARY_COLOR } from '../../styles/constants';
import AvailableIcon from '../../assets/images/available.svg';
import ClearButton from '../../assets/images/unavailable.svg';
import { string } from 'yup';

export default function UsernameForm({
  theme,
  screenHeight,
  displayError,
  eraseError,
  validUsername,
  invalidUsername,
}) {
  const [text, setText] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  {
    /*/
  For now username checks for 
  1. If it consists only of alphnumerals, underscore and period
  2. checks if its length is at least 6 characters
  3. checks if it ends with a period
  4. checks if there are more than 2 consecutive periods
*/
  }
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
      displayError ? ERROR_COLOR : PRIMARY_COLOR;
      return;
    }

    if (!string().min(6).isValidSync(textValue)) {
      setErrorMsg('Your username should have a minimum of 6 characters.');
      invalidUsername();
      displayError ? ERROR_COLOR : PRIMARY_COLOR;
      return;
    }
    if (string().matches(/[.]$/).isValidSync(textValue)) {
      setErrorMsg("You can't end your username with as a period");
      invalidUsername();
      displayError ? ERROR_COLOR : PRIMARY_COLOR;
      return;
    }
    if (
      !string()
        .matches(/^(?!.*?[._]{2})[a-zA-Z0-9_.]+$/)
        .isValidSync(textValue)
    ) {
      setErrorMsg("You can't have more than one period in a row");
      invalidUsername();
      displayError ? ERROR_COLOR : PRIMARY_COLOR;
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
          tintColor={errorMsg && displayError ? ERROR_COLOR : PRIMARY_COLOR}
          labelFontSize={20}
          fontSize={25}
          autoCapitalize="none"
          selectionColor={PRIMARY_COLOR}
          autoCompleteType="off"
          keyboardType="ascii-capable"
          textContentType="none"
          maxLength={35}
          autoCorrect={false}
          autoFocus={false}
          clearButtonMode="while-editing"
          enablesReturnKeyAutomatically={true}
          blurOnSubmit={true}
          returnKeyType="done"
          onChangeText={manageTextInput}
          value={text}
        />
        <Text style={styles.feedbackText}>{displayError ? errorMsg : ''}</Text>
      </View>
    </View>
  );
}
