// public imports
import React, { useState } from 'react';
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

// custom imports
import styles from '../../styles/welcome.styles';
import { PRIMARY_COLOR, ERROR_COLOR } from '../../styles/constants';
import { TEXT_REGULAR } from '../../styles/fonts';

export default function EnterEmailForm({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [displayError, setDisplayError] = useState(false);
  const [text, setText] = useState(null);
  const theme = useTheme();

  const onTextInput = (textValue) => {
    setDisplayError(false);
    setText(textValue);
    if (!string().email().required().isValidSync(textValue)) {
      setErrorMsg('Please enter a valid email address');
    } else {
      setErrorMsg('');
    }
    return;
  };

  const _onPress = () => {
    setDisplayError(true);
    if (text) {
      if (errorMsg) {
        return;
      }
      navigation.navigate('VerificationLink');
    }
    return;
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
            placeholder="m***@****.**"
            autoCapitalize="none"
            selectionColor={PRIMARY_COLOR}
            autoCompleteType="off"
            keyboardType="email-address"
            textContentType="none"
            autoCorrect={false}
            autoFocus={true}
            onChangeText={onTextInput}
            clearButtonMode="while-editing"
            blurOnSubmit={true}
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
