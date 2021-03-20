// public imports
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import SendSMS from 'react-native-sms';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';

export default function PhoneForm({ navigation }) {
  const theme = useTheme();

  const { phone, setPhone } = useContext(SignUpContext);
  const [isLoading, setIsLoading] = useState(false);

  const _continue = () => {
    setIsLoading(true);

    // this module doesn't work on virtual device (must test on actual device)
    // Youngmi look at this for SMS callback
    SendSMS.send(
      {
        body: 'Sureplus Verification Code e8ce0df77a3abcca0a938d2e499c9daf', // add hash
        recipients: ['1056634352'], // can send to multiple numbers
        successTypes: ['sent', 'queued'], // for android
        allowAndroidSendWithoutReadPermission: true, // for android
      },
      (completed, cancelled, error) => {
        setIsLoading(false);
        if (completed) {
          console.log('Message successfully sent');
          navigation.navigate('Name');
        } else if (cancelled) {
          Alert.alert('User cancelled');
        } else {
          Alert.alert('Error! Message not sent :(');
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.titleText}>Send us a message</Text>
        <Text style={styles.bodyText}>
          We use text messages to verify device ownership. Press send without
          changing the code.
        </Text>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/sms_verification.png')}
            style={{
              resizeMode: 'contain',
              aspectRatio: 0.6,
            }}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.mainButton,
            { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
          ]}
          onPress={_continue}
          activeOpacity={0.7}>
          <Text style={[styles.mainButtonText, { color: theme.colors.text }]}>
            Agree and Verify
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
