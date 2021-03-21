// public imports
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
import { PRIMARY_COLOR } from '../../styles/constants';

export default function NameForm({ navigation }) {
  const theme = useTheme();

  const [step, setStep] = useState(false);
  const [focus, setFocus] = useState(0);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const lastNameRef = useRef();

  const _showNext = async () => {
    await setStep(true);
    lastNameRef.current.focus();
  };
  const _continue = () => {
    setFocus(3);
    navigation.navigate('Bank');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-20}>
      <View style={styles.container}>
        <View style={[styles.body, { width: '100%' }]}>
          <Text style={[styles.titleText, { color: theme.colors.title }]}>
            What is your full legal name?
          </Text>
          <View style={{ marginTop: 40 }}>
            <Text style={styles.labelText}>First Name</Text>
            <TextInput
              placeholder="First Name"
              keyboardAppearance={theme.dark ? 'dark' : 'light'}
              style={[
                styles.textInput,
                {
                  color: theme.colors.mainText,
                  borderBottomColor: focus === 0 ? PRIMARY_COLOR : '#F1F2F4',
                },
              ]}
              autoCapitalize="words"
              selectionColor={theme.dark ? 'white' : PRIMARY_COLOR}
              autoCompleteType="off"
              keyboardType="default"
              textContentType="givenName"
              maxLength={35}
              autoCorrect={false}
              autoFocus={true}
              clearButtonMode="while-editing"
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={false}
              onChangeText={(value) => {
                setFirstName(value);
              }}
              onSubmitEditing={_showNext}
              onFocus={() => setFocus(0)}
            />
          </View>
          <View
            style={{
              marginTop: 16,
              width: step ? '100%' : 0,
              height: step ? '100%' : 0,
            }}>
            <Text style={styles.labelText}>Last Name</Text>
            <TextInput
              placeholder="Last Name"
              keyboardAppearance={theme.dark ? 'dark' : 'light'}
              style={[
                styles.textInput,
                {
                  color: theme.colors.mainText,
                  borderBottomColor: focus === 1 ? PRIMARY_COLOR : '#F1F2F4',
                },
              ]}
              autoCapitalize="words"
              selectionColor={PRIMARY_COLOR}
              autoCompleteType="off"
              keyboardType="default"
              textContentType="givenName"
              maxLength={35}
              autoCorrect={false}
              clearButtonMode="while-editing"
              enablesReturnKeyAutomatically={true}
              onChangeText={(value) => {
                setLastName(value);
              }}
              onFocus={() => setFocus(1)}
              onSubmitEditing={_continue}
              ref={lastNameRef}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            {firstName && lastName ? (
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
