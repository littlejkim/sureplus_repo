// public imports
import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextField } from 'rn-material-ui-textfield';
import { string } from 'yup';

// custom imports
import { OnboardingContext } from '../../navigation/OnboardingContainer';
import styles from '../../styles/welcome.styles';
import { PRIMARY_COLOR, ERROR_COLOR } from '../../styles/constants';
import { TwoButtonModal } from '../../components/TwoButtonModal';
import { set } from 'lodash-es';
import { TEXT_REGULAR } from '../../styles/fonts';

export default function PreviousNumberForm({ navigation }) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [localNumber, setLocalNumber] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef();
  const PNF = require('google-libphonenumber').PhoneNumberFormat;
  const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

  const contents = {
    title: 'Number not found',
    body: 'Would you like to create a new account instead?',
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

  const _onChange = (textValue) => {
    const strFirstThree = textValue.replace(/[-]/g, '').substring(0, 3);
    const strNextThree = textValue.replace(/[-]/g, '').substring(3, 6);
    const strLastFour = textValue.replace(/[-]/g, '').substring(6, 10);
    const firstHyphen = textValue.length > 3 ? '-' : '';
    const secondHyphen = textValue.length > 7 ? '-' : '';
    setLocalNumber(
      `${strFirstThree}${firstHyphen}${strNextThree}${secondHyphen}${strLastFour}`,
    );
    setError(null);
  };

  const _onPress = () => {
    console.log(localNumber);
    const number = phoneUtil.parseAndKeepRawInput(localNumber, 'US');
    phoneUtil.isPossibleNumber(number)
      ? console.log('true')
      : console.log('false');
    //setVisible(true);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
            baseColor={inputRef.isFocused()}
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
            prefix="+1"
          />
        </View>
      </View>
      <TwoButtonModal
        visible={visible}
        contents={contents}
        continue={_continue}
        hide={hide}></TwoButtonModal>
      <View
        style={[
          styles.footer,
          {
            alignItems: 'flex-end',
            opacity: 1,
          },
        ]}>
        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.7}
          onPress={_onPress}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
