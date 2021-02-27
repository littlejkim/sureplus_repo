// public imports
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { TEXT_BOLD, TEXT_REGULAR } from '../styles/constants';
import Spinner from 'react-native-loading-spinner-overlay';

// custom imports
import styles from '../styles/onboarding.styles';

export default function SignUpScreen() {
  const [loading, setLoading] = useState(false); // used to show loading spinner
  const [email, setEmail] = useState();

  // wait for email verification
  const verifyEmail = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} animation="fade" />
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
            textContentType="emailAddress"
            maxLength={320}
            autoCorrect={false}
            autoFocus={true}
            clearButtonMode="while-editing"
            onChangeText={(text) => setEmail(text)}
            onEndEditing={() => console.log(email)}
            textAlign="center"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.mainButton,
            { marginBottom: Platform.OS === 'ios' ? 0 : -30 }, // check android margin bottom for footer
          ]}
          onPress={verifyEmail}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
