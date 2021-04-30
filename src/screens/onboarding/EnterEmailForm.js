/* eslint-disable react-native/no-inline-styles */
// public imports
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextField } from 'rn-material-ui-textfield';
import { string } from 'yup';
import { API } from 'aws-amplify';

// custom imports
import styles from '../../styles/welcome.styles';
import { PRIMARY_COLOR, ERROR_COLOR } from '../../styles/constants';
import { TEXT_REGULAR } from '../../styles/fonts';
import { OnboardingContext } from '../../navigation/OnboardingContainer';

export default function EnterEmailForm({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [localEmail, setLocalEmail] = useState(null);
  const [displayEmail, setDisplayEmail] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  const [text, setText] = useState(null);
  const theme = useTheme();
  const { email } = useContext(OnboardingContext);

  //masking function
  const _setEmail = (email) => {
    let test = email;
    let int = 0;
    test = test.split('').map((x) => {
      int++;
      if (int === 1 || int === 2) {
        return x;
      } else {
        if (x === '@') {
          int = 1;
          return x;
        }
        if (x === '.') {
          return x;
        }
        x = '*';
        return x;
      }
    });
    setLocalEmail(test.toString().replace(/[,]/g, ''));
  };

  useEffect(() => {
    _setEmail(email);
  }, [email]); // Only re-run the effect if count changes

  const onTextInput = (textValue) => {
    setDisplayError(false);
    setText(textValue);
    if (!string().email().required().isValidSync(textValue)) {
      setErrorMsg('Please enter a valid email address');
    }
    if (email !== textValue) {
      setErrorMsg('Please enter your previous email');
    } else {
      setErrorMsg('');
    }
    return;
  };

  const _onPress = () => {
    /*setDisplayError(true);
    if (errorMsg) {
      return;
    } else {
      navigation.navigate('VerificationLink');
    }*/
    /*API.post('twilioapi', '/verify/email', {
      body: { email: 'mhanhan123@gmail.com', subject: 'Welcome to Sureplus!' },
    })
      .then((res) => console.log('/verify/email: ', res))
      .catch((err) => console.log('/verify/email err: ', err));
    return;*/
    navigation.navigate('VerificationLink');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-35}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Enter your email.
        </Text>
        <Text style={styles.bodyText}>
          Tell us your email address associated with{'\n'}
          your Sureplus account, and we’ll send you{'\n'}a verification link.
        </Text>

        <View style={{ marginTop: 28 }}>
          <TextField
            keyboardAppearance={theme.dark ? 'dark' : 'light'}
            tintColor={PRIMARY_COLOR}
            labelFontSize={14}
            fontSize={24}
            error={displayError ? errorMsg : null}
            errorColor={ERROR_COLOR}
            labelTextStyle={{ fontFamily: TEXT_REGULAR }}
            titleTextStyle={{ fontFamily: TEXT_REGULAR }}
            affixTextStyle={{ fontFamily: TEXT_REGULAR }}
            placeholder={displayEmail ? localEmail : ''}
            autoCapitalize="none"
            selectionColor={PRIMARY_COLOR}
            autoCompleteType="off"
            keyboardType="email-address"
            textContentType="none"
            autoCorrect={false}
            onChangeText={onTextInput}
            clearButtonMode="while-editing"
            blurOnSubmit={true}
            onFocus={() => setDisplayEmail(false)}
            onBlur={() => setDisplayEmail(true)}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.subButtonGrey}
          onPress={() => console.log('Contact Customer Support')}
          activeOpacity={0.5}>
          <Text style={[styles.subButtonTextGrey, { color: '#6B7583' }]}>
            I don't have access to this email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => _onPress()}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Send Verificaiton Link</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
