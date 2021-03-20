// public imports
import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
import { PRIMARY_COLOR } from '../../styles/constants';

export default function NameForm({ navigation }) {
  const theme = useTheme();
  const lastName = useRef();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={[styles.body, { width: '100%' }]}>
          <Text style={styles.titleText}>What is your full legal name?</Text>
          <View style={{ marginTop: 40 }}>
            <Text style={styles.labelText}>First Name</Text>
            <TextInput
              placeholder="First Name"
              keyboardAppearance={theme.dark ? 'dark' : 'light'}
              style={[styles.textInput, { color: theme.colors.mainText }]}
              autoCapitalize="none"
              selectionColor={PRIMARY_COLOR}
              autoCompleteType="off"
              keyboardType="default"
              textContentType="givenName"
              maxLength={35}
              autoCorrect={false}
              autoFocus={true}
              clearButtonMode="always"
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={() => lastName.current.focus()}
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={styles.labelText}>Last Name</Text>
            <TextInput
              placeholder="Last Name"
              keyboardAppearance={theme.dark ? 'dark' : 'light'}
              style={[styles.textInput, { color: theme.colors.mainText }]}
              autoCapitalize="none"
              selectionColor={PRIMARY_COLOR}
              autoCompleteType="off"
              keyboardType="default"
              textContentType="givenName"
              maxLength={35}
              autoCorrect={false}
              clearButtonMode="always"
              enablesReturnKeyAutomatically={true}
              onEndEditing={(value) => {
                console.log('hi');
              }}
              onSubmitEditing={() => console.log('next')}
              ref={lastName}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => navigation.navigate('Bank')}
              activeOpacity={0.7}>
              <Text
                style={[styles.mainButtonText, { color: theme.colors.text }]}>
                icon
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
