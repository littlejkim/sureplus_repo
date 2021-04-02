// public imports
import React, { useContext, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
import { ERROR_COLOR, PRIMARY_COLOR } from '../../styles/constants';
import AvailableIcon from '../../assets/images/available.svg';
import ClearButton from '../../assets/images/unavailable.svg';

export default function UsernameForm({ navigation }) {
  const theme = useTheme();
  const { setUsername } = useContext(SignUpContext);
  const [localUsername, setLocalUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isValidUsername, setIsValidUsername] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [borderColor, setBorderColor] = useState(PRIMARY_COLOR);
  const inputRef = useRef();

  const _continue = () => {
    setIsLoading(true);
    const response = _checkUsername();
    response ? navigation.navigate('Confirm') : null;
  };

  // YOUNGMI add logic for checking username exists
  const _checkUsername = () => {
    setIsLoading(false);
    if (localUsername === 'johnkim') {
      setBorderColor('#EFEFF4');
      setIsValidUsername(true);
      setUsername(localUsername);
      return true;
    } else {
      setBorderColor(ERROR_COLOR);
      setIsValidUsername(false);
      inputRef.current.focus();
      return false;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-20}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={[styles.titleText, { color: theme.colors.title }]}>
            Choose a username
          </Text>
          <Text style={[styles.bodyText, { color: theme.colors.title }]}>
            Choose a username for your new account. You can always change it
            later.
          </Text>
          <View
            style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
            <TextInput
              placeholder="Username"
              keyboardAppearance={theme.dark ? 'dark' : 'light'}
              style={[
                styles.textInput,
                {
                  flex: 1,
                  color: theme.colors.mainText,
                  borderBottomWidth: 0,
                },
              ]}
              autoCapitalize="none"
              selectionColor={PRIMARY_COLOR}
              autoCompleteType="off"
              keyboardType="ascii-capable"
              textContentType="nickname"
              maxLength={35}
              autoCorrect={false}
              autoFocus={true}
              onBlur={() => {
                setIsEditing(false);
              }}
              clearButtonMode="never"
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={true}
              value={localUsername}
              onChangeText={(value) => {
                setIsValidUsername(null);
                setIsEditing(true);
                setBorderColor(PRIMARY_COLOR);
                // regex for replacing special characters implemented on here due to copy/paste issues
                setLocalUsername(value.replace(/[^.A-Za-z0-9_-]/gi, ''));
              }}
              onSubmitEditing={() => _continue}
              returnKeyType="done"
              ref={inputRef}
            />
            {isEditing ? (
              <ClearButton height={'100%'} width={21} />
            ) : isLoading ? (
              <ActivityIndicator size="small" color="gray" />
            ) : null}
            {!isEditing && !isLoading && isValidUsername ? (
              <AvailableIcon height={'100%'} width={21} />
            ) : null}
          </View>
          {isValidUsername === false ? (
            <Text style={styles.feedbackText}>
              A user with that username already exists.
            </Text>
          ) : null}
        </View>
        <View style={styles.footer}>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            {localUsername && localUsername.length > 5 ? (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={_continue}
                activeOpacity={0.7}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <View
                style={[styles.nextButton, { opacity: 0.5 }]}
                onPress={_continue}
                activeOpacity={0.7}>
                <Text style={styles.nextButtonText}>Next</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
