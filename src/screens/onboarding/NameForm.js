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

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
import { FloatingTextInput } from '../../components/FloatingTextInput';
import { string } from 'yup';

export default function NameForm({ navigation }) {
  const theme = useTheme();
  const { setFirstname, setLastname } = useContext(SignUpContext);
  const [localFirst, setLocalFirst] = useState(null);
  const [localLast, setLocalLast] = useState(null);
  const [validFirst, setValidFirst] = useState(false);
  const [validLast, setValidLast] = useState(false);
  const lastNameRef = useRef();

  {
    /* current implementation only checks if it is an alphabet. We might want to add more*/
  }
  const handleOnChangeFirst = (localFirstValue) => {
    console.log(localFirstValue);
    setLocalFirst(localFirstValue);
    if (
      !string()
        .matches(/^[A-Za-z]*$/)
        .required()
        .isValidSync(localFirstValue)
    ) {
      setValidFirst(false);
      return;
    }
    setValidFirst(true);
  };
  const handleOnChangeLast = (localLastValue) => {
    console.log(localLastValue);
    setLocalLast(localLastValue);
    if (
      !string()
        .matches(/^[A-Za-z]*$/)
        .min(1)
        .isValidSync(localLastValue)
    ) {
      setValidLast(false);
      return;
    }
    setValidLast(true);
  };

  const _continue = () => {
    setFirstname(localFirst);
    setLastname(localLast);
    navigation.navigate('LinkBank');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={-20}>
        <View style={styles.body}>
          <Text style={[styles.titleText, { color: theme.colors.title }]}>
            What is your full legal name?
          </Text>
          <View style={{ marginTop: 40 }}>
            <View style={{ paddingBottom: 30 }}>
              <FloatingTextInput
                label="First Name"
                returnKeyType="next"
                value={localFirst}
                autoFocus={true}
                autoCapitalize="words"
                autoCompleteType="off"
                keyboardType="ascii-capable"
                maxLength={30}
                enablesReturnKeyAutomatically={true}
                onChangeText={handleOnChangeFirst}
                value={localFirst}
                onSubmitEditing={() => lastNameRef.current.focus()}
              />
              <Text style={styles.feedbackText}>
                {validFirst
                  ? ''
                  : localFirst
                  ? 'Invalid First name format'
                  : ''}
              </Text>
            </View>
            <FloatingTextInput
              label="Last Name"
              returnKeyType="done"
              value={localLast}
              autoFocus={false}
              autoCapitalize="words"
              autoCompleteType="off"
              keyboardType="ascii-capable"
              maxLength={30}
              enablesReturnKeyAutomatically={true}
              onChangeText={handleOnChangeLast}
              value={localLast}
              onSubmitEditing={() => _continue()}
              inputRef={lastNameRef}
            />
            <Text style={styles.feedbackText}>
              {validLast ? '' : localLast ? 'Invalid Last name format' : ''}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.footer,
            {
              alignItems: 'flex-end',
              opacity: validFirst && validLast ? 1 : 0.5,
            },
          ]}>
          <TouchableOpacity
            style={styles.nextButton}
            disabled={validFirst && validLast ? false : true}
            onPress={_continue}
            activeOpacity={0.7}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
