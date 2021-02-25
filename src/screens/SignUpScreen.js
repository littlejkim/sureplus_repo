// public imports
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { TEXT_BOLD, TEXT_REGULAR } from '../styles/constants';
// custom imports
import styles from '../styles/onboarding.styles';

export default function SignUpScreen() {
  const [email, setEmail] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={{ fontFamily: TEXT_BOLD, color: 'white', fontSize: 30 }}>
          Enter email address
        </Text>
        <View
          style={{
            width: '80%',
            marginTop: 30,
          }}>
          <TextInput
            style={{ fontFamily: TEXT_REGULAR, fontSize: 25, color: 'white' }}
            autoCapitalize="none"
            selectionColor="white"
            autoCompleteType="email"
            keyboardType="email-address"
            maxLength={320}
            autoCorrect={false}
            autoFocus={true}
            clearButtonMode="while-editing"
            onChangeText={(text) => setEmail(text)}
            onEndEditing={() => console.log(email)}
            textAlign="center"
            textContentType="emailAddress"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.signUpButton, { flex: 0.5 }]}
          onPress={() => console.log('hi')}
          activeOpacity={0.7}>
          <Text style={styles.signUpButtonTitle}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
