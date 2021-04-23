// public imports
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextField } from 'rn-material-ui-textfield';
import { PhoneNumberUtil } from 'google-libphonenumber';

// custom imports
import styles from '../../styles/welcome.styles';
import { PRIMARY_COLOR, ERROR_COLOR } from '../../styles/constants';
import { TwoButtonModal } from '../../components/TwoButtonModal';
import { TEXT_REGULAR } from '../../styles/fonts';

export default function PreviousNumberForm({ navigation }) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [localNumber, setLocalNumber] = useState(null);
  const [error, setError] = useState(null);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef();
  const phoneUtil = PhoneNumberUtil.getInstance();

  const contents = {
    title: 'Number not found',
    body: 'Would you like to create a new \n account instead?',
    mainButton: 'Create new account',
    subButton: 'Cancel',
  };

  const hide = () => {
    setVisible(false);
  };

  const _continue = () => {
    setVisible(false);
    navigation.navigate('NameForm');
  };
  //We can use a build in formatting method from google-libphonenumber
  //but the method felt very unstable cause it was prone to crash on
  //different inputs.
  const _onChange = (textValue) => {
    const strFirstThree = textValue.replace(/[-]/g, '').substring(0, 3);
    const strNextThree = textValue.replace(/[-]/g, '').substring(3, 6);
    const strLastFour = textValue.replace(/[-]/g, '').substring(6, 10);
    const firstHyphen = textValue.length > 3 ? '-' : '';
    const secondHyphen = textValue.length > 8 ? '-' : '';
    setLocalNumber(
      `${strFirstThree}${firstHyphen}${strNextThree}${secondHyphen}${strLastFour}`,
    );
    setError(null);
  };

  const _onPress = () => {
    let number = '';
    try {
      number = phoneUtil.parseAndKeepRawInput(localNumber, 'US');
    } catch (e) {
      setError('Please enter a valid phone number');
      return;
    }
    phoneUtil.isPossibleNumber(number)
      ? (setError(null), setVisible(true))
      : setError('Please enter a valid phone number');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-35}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Enter your previous number.
        </Text>
        <View style={{ marginTop: 40 }}>
          <TextField
            ref={inputRef}
            label="Phone Number"
            keyboardAppearance={theme.dark ? 'dark' : 'light'}
            tintColor={PRIMARY_COLOR}
            baseColor={focus ? '#000000' : 'rgba(0, 0, 0, 0.38)'}
            labelFontSize={14}
            fontSize={24}
            error={error}
            errorColor={ERROR_COLOR}
            labelTextStyle={{ fontFamily: TEXT_REGULAR }}
            titleTextStyle={{ fontFamily: TEXT_REGULAR }}
            affixTextStyle={{ fontFamily: TEXT_REGULAR }}
            autoCapitalize="none"
            selectionColor={PRIMARY_COLOR}
            autoCompleteType="off"
            keyboardType="number-pad"
            textContentType="none"
            maxLength={12}
            autoCorrect={false}
            autoFocus={true}
            clearButtonMode="while-editing"
            onChangeText={_onChange}
            blurOnSubmit={true}
            value={localNumber}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            prefix="+1"
          />
        </View>
      </View>
      <TwoButtonModal
        visible={visible}
        contents={contents}
        continue={_continue}
        hide={hide}
      />
      <View
        style={[
          styles.footer,
          {
            alignItems: 'flex-end',
            opacity: localNumber ? 1 : 0.5,
          },
        ]}>
        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.7}
          onPress={_onPress}
          disabled={localNumber ? false : true}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
