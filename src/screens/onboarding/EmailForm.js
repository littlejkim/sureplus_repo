/* eslint-disable react-native/no-inline-styles */
// public imports
import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextField } from 'rn-material-ui-textfield';

// custom imports
import { OnboardingContext } from '../../navigation/OnboardingContainer';
import styles from '../../styles/welcome.styles';
import { PRIMARY_COLOR, ERROR_COLOR } from '../../styles/constants';

export default function EmailForm({
  screenHeight,
  focusEmail,
  unfocusEmail,
  scrollEnd,
  setScrollEnd,
  setEmailText,
  emailErrorMsg,
  setEmailErrorMsg,
  _onSubmitEditing,
  isLoading,
  scrollUp,
}) {
  const textinputRef = useRef();
  const theme = useTheme();

  useEffect(() => {
    if (focusEmail && scrollEnd) {
      textinputRef.current.focus();
      unfocusEmail();
      setScrollEnd();
    }
  }, [focusEmail, scrollEnd, setScrollEnd, unfocusEmail]);

  const onTextInput = async (textValue) => {
    setEmailText(textValue);
    setEmailErrorMsg(null);
  };

  return (
    <View
      style={{
        height: screenHeight,
      }}>
      <View>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          What is your email?
        </Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <TextField
          ref={textinputRef}
          label="Email"
          keyboardAppearance={theme.dark ? 'dark' : 'light'}
          tintColor={PRIMARY_COLOR}
          error={emailErrorMsg}
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
          clearButtonMode={isLoading ? null : 'while-editing'}
          enablesReturnKeyAutomatically={true}
          blurOnSubmit={true}
          returnKeyType="next"
          onChangeText={onTextInput}
          onSubmitEditing={() => _onSubmitEditing()}
          onFocus={() => scrollUp()}
          renderRightAccessory={() =>
            isLoading ? (
              <View style={{ width: 38, height: 27 }}>
                <ActivityIndicator
                  size="small"
                  color="#ACB5BE"
                  justifyContent="center"
                  alignItems="center"
                />
              </View>
            ) : null
          }
        />
      </View>
    </View>
  );
}
