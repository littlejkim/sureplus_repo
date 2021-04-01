// public imports
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Keyboard,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
import { PRIMARY_COLOR } from '../../styles/constants';

export default function EmailForm({ navigation }) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { setEmail } = useContext(SignUpContext);
  const [localEmail, setLocalEmail] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState();
  const [borderColor, setBorderColor] = useState(PRIMARY_COLOR);

  const _continue = () => {
    setIsLoading(true);
    const response = _validateEmail();
    setEmail(localEmail);
    response ? navigation.navigate('Username') : null;
  };

  const _validateEmail = () => {
    setIsLoading(false);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(localEmail);
    setIsValidEmail(isValid);
    if (isValid) {
      setBorderColor(PRIMARY_COLOR);
      return true;
    } else {
      setBorderColor('#FF3B30');
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
            What is your email?
          </Text>
          <View style={{ marginTop: 40 }}>
            <TextInput
              placeholder="Email"
              keyboardAppearance={theme.dark ? 'dark' : 'light'}
              style={[
                styles.textInput,
                {
                  color: theme.colors.mainText,
                  borderBottomColor: borderColor,
                },
              ]}
              autoCapitalize="none"
              selectionColor={PRIMARY_COLOR}
              autoCompleteType="off"
              keyboardType="email-address"
              textContentType="emailAddress"
              maxLength={35}
              autoCorrect={false}
              autoFocus={true}
              clearButtonMode="while-editing"
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={true}
              onChangeText={(value) => {
                setLocalEmail(value),
                  setBorderColor(PRIMARY_COLOR),
                  setIsValidEmail(null);
              }}
              onSubmitEditing={() => _continue}
              returnKeyType="done"
            />
          </View>
          {isValidEmail === false ? (
            <Text style={styles.feedbackText}>
              Please enter a valid email address.
            </Text>
          ) : null}
        </View>
        <View style={styles.footer}>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            {localEmail && localEmail.length > 6 ? (
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
