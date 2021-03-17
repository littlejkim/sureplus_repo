// public imports
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
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
        body: 'TODO: add hash to send to server', // add hash
        recipients: ['1056634352'], // can send to multiple numbers
        successTypes: ['sent', 'queued'], // for android
        allowAndroidSendWithoutReadPermission: true, // for android
      },
      (completed, cancelled, error) => {
        setIsLoading(false);
        if (completed) {
          console.log('Message successfully sent');
          navigation.navigate('Email');
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
        <Text
          style={[
            styles.titleText,
            {
              color: theme.colors.mainText,
            },
          ]}>
          Send SMS
        </Text>
      </View>
      <View style={styles.footer}>
        {!isLoading ? (
          <TouchableOpacity
            style={[
              styles.mainButton,
              { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
            ]}
            onPress={_continue}
            activeOpacity={0.7}>
            <Text style={[styles.mainButtonText, { color: theme.colors.text }]}>
              Next
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={[
              styles.mainButton,
              { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
            ]}>
            <ActivityIndicator size="small" color="white" />
          </View>
        )}
      </View>
    </View>
  );
}
