// public imports
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
import { PRIMARY_COLOR } from '../../styles/constants';

export default function UsernameForm({ navigation }) {
  const theme = useTheme();
  const { setUsername } = useContext(SignUpContext);
  const [localUsername, setLocalUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isAvailable, setIsAvailable] = useState(null);
  const [borderColor, setBorderColor] = useState(PRIMARY_COLOR);
  const initialBorderColor = '#EFEFF4';

  const _continue = () => {
    setIsLoading(true);
    _checkUsername();
  };

  // YOUNGMI add logic for checking username exists
  const _checkUsername = () => {
    setTimeout(() => {
      setIsLoading(false);
      if (localUsername === 'johnkim') {
        setBorderColor(initialBorderColor);
        setIsAvailable(true);
        console.log('Username is available');
        setUsername(localUsername);
        // navigation.navigate('Confirm');
      } else {
        setIsAvailable(false);
        setBorderColor('#FF3B30');
        console.log('Username is unavailable');
      }
    }, 2000);
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
                  color: theme.colors.mainText,
                  borderBottomColor: borderColor,
                },
              ]}
              autoCapitalize="none"
              selectionColor={theme.dark ? 'white' : PRIMARY_COLOR}
              autoCompleteType="off"
              keyboardType="ascii-capable"
              textContentType="nickname"
              maxLength={35}
              autoCorrect={false}
              autoFocus={true}
              clearButtonMode="never"
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={true}
              value={localUsername}
              onChangeText={(value) => {
                // regex for replacing special characters implemented on here due to copy/paste issues
                setLocalUsername(value.replace(/[^.A-Za-z0-9_-]/gi, '')),
                  setIsAvailable(null);
                setIsLoading(null);
              }}
              onKeyPress={({ nativeEvent }) => {
                nativeEvent.key === 'Backspace'
                  ? setBorderColor(initialBorderColor)
                  : setBorderColor(PRIMARY_COLOR);
              }}
              onSubmitEditing={(value) => {
                _continue(value), setBorderColor(initialBorderColor);
              }}
              returnKeyType="next"
            />
            {isLoading === null ? null : isLoading ? (
              <ActivityIndicator size="small" color="gray" />
            ) : isAvailable ? (
              <Image
                source={require('../../assets/images/available.png')}
                style={styles.availablityIcon}
              />
            ) : (
              <Image
                source={require('../../assets/images/unavailable.png')}
                style={styles.availablityIcon}
              />
            )}
          </View>
          {isAvailable === false ? (
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
                style={styles.roundButton}
                onPress={_continue}
                activeOpacity={0.7}>
                <Image
                  source={require('../../assets/images/next_arrow.png')}
                  style={{ resizeMode: 'contain', aspectRatio: 0.5 }}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={[styles.roundButton, { opacity: 0.5 }]}
                onPress={_continue}
                activeOpacity={0.7}>
                <Image
                  source={require('../../assets/images/next_arrow.png')}
                  style={{ resizeMode: 'contain', aspectRatio: 0.5 }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
