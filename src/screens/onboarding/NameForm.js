// public imports
import React, { useRef, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextField } from 'rn-material-ui-textfield';

// custom imports
import styles from '../../styles/welcome.styles';
import { OnboardingContext } from '../../navigation/OnboardingContainer';
import { string } from 'yup';
import { ERROR_COLOR, PRIMARY_COLOR } from '../../styles/constants';
import { TEXT_REGULAR } from '../../styles/fonts';

export default function NameForm({ navigation }) {
  const theme = useTheme();
  const { setFirstname, setLastname } = useContext(OnboardingContext);
  const [localFirst, setLocalFirst] = useState(null);
  const [localLast, setLocalLast] = useState(null);
  const [firstNameError, setFirstNameError] = useState();
  const [lastNameError, setLastNameError] = useState();
  const lastNameRef = useRef();

  const _schemaValidation = (text) => {
    return string()
      .matches(/^[A-Za-z ]*$/)
      .required()
      .isValidSync(text);
  };

  const _validateFirstName = () => {
    _schemaValidation(localFirst)
      ? (lastNameRef.current.focus(), setFirstNameError(null))
      : setFirstNameError('Cannot contain special characters');
  };

  const _validateLastName = () => {
    _schemaValidation(localLast)
      ? (_continue(), setLastNameError(null))
      : setLastNameError('Cannot contain special characters');
  };

  const onChangeTextFirst = (textValue) => {
    setLocalFirst(textValue);
    setFirstNameError(null);
  };

  const onChangeTextLast = (textValue) => {
    setLocalLast(textValue);
    setLastNameError(null);
  };

  const _continue = () => {
    setFirstname(localFirst);
    setLastname(localLast);
    navigation.navigate('AdditionalForm');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-35}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          What is your full legal name?
        </Text>
        <View style={{ marginTop: 40 }}>
          <View style={{ paddingBottom: 30 }}>
            <TextField
              value={localFirst}
              label="First Name"
              lineWidth={2}
              disabledLineWidth={2}
              fontSize={24}
              labelFontSize={14}
              tintColor={PRIMARY_COLOR}
              error={firstNameError}
              errorColor={ERROR_COLOR}
              contentInset={{ top: 0, input: 4 }}
              labelTextStyle={{ fontFamily: TEXT_REGULAR }}
              titleTextStyle={{ fontFamily: TEXT_REGULAR }}
              affixTextStyle={{ fontFamily: TEXT_REGULAR }}
              autoFocus={true}
              autoCapitalize="words"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="ascii-capable"
              returnKeyType="next"
              maxLength={30}
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={false}
              onChangeText={onChangeTextFirst}
              onSubmitEditing={() => _validateFirstName()}
            />
          </View>
          <TextField
            value={localLast}
            label="Last Name"
            lineWidth={2}
            disabledLineWidth={2}
            fontSize={24}
            labelFontSize={14}
            tintColor={PRIMARY_COLOR}
            error={lastNameError}
            errorColor={ERROR_COLOR}
            contentInset={{ top: 0, input: 4 }}
            labelTextStyle={{ fontFamily: TEXT_REGULAR }}
            titleTextStyle={{ fontFamily: TEXT_REGULAR }}
            affixTextStyle={{ fontFamily: TEXT_REGULAR }}
            autoFocus={false}
            autoCapitalize="words"
            autoCompleteType="off"
            autoCorrect={false}
            keyboardType="ascii-capable"
            returnKeyType="done"
            maxLength={30}
            enablesReturnKeyAutomatically={true}
            blurOnSubmit={false}
            onChangeText={onChangeTextLast}
            onSubmitEditing={() => _validateLastName()}
            ref={lastNameRef}
          />
        </View>
      </View>

      <View
        style={[
          styles.footer,
          {
            alignItems: 'flex-end',
            opacity: localFirst && localLast ? 1 : 0.5,
          },
        ]}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            _schemaValidation(localFirst)
              ? null
              : setFirstNameError('Cannot contain special characters');
            _schemaValidation(localLast)
              ? null
              : setLastNameError('Cannot contain special characters');
            _schemaValidation(localFirst) && _schemaValidation(localLast)
              ? _continue()
              : null;
          }}
          activeOpacity={0.7}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
