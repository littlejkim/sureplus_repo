// public imports
import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextField } from 'rn-material-ui-textfield';

// custom imports
import styles from '../../styles/welcome.styles';
import { ERROR_COLOR, PRIMARY_COLOR } from '../../styles/constants';

export default function UsernameForm({
  screenHeight,
  focusUsername,
  unfocusUsername,
  scrollEnd,
  setScrollEnd,
  setUsernameText,
  usernameErrorMsg,
  setUsernameErrorMsg,
  _onSubmitEditing,
}) {
  const textinputRef = useRef();
  const theme = useTheme();

  useEffect(() => {
    if (focusUsername && scrollEnd) {
      textinputRef.current.focus();
      unfocusUsername();
      setScrollEnd();
    }
  }, [focusUsername, scrollEnd, setScrollEnd, unfocusUsername]);

  const _onTextchange = (textValue) => {
    setUsernameText(textValue);
    setUsernameErrorMsg(null);
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
          ref={textinputRef}
          label="Username"
          keyboardAppearance={theme.dark ? 'dark' : 'light'}
          tintColor={PRIMARY_COLOR}
          error={usernameErrorMsg}
          errorColor={ERROR_COLOR}
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
          onChangeText={_onTextchange}
          _onSubmitEditing={() => _onSubmitEditing()}
        />
      </View>
    </View>
  );
}
