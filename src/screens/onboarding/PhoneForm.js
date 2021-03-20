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
import DeviceInfo from 'react-native-device-info';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';

export default function PhoneForm({ navigation }) {
  const theme = useTheme();

  const { phone, setPhone } = useContext(SignUpContext);
  const [isLoading, setIsLoading] = useState(false);

  const _continue = () => {
    setIsLoading(true);

    // bypass SMS auth if virtual device (emulator)
    DeviceInfo.isEmulator().then((isEmulator) => {
      isEmulator ? navigation.navigate('Name') : _sendText();
    });
  };

  // not called if run by emulator (virtual device)
  const _sendText = async () => {
    // this is temporary timeout
    await setTimeout(() => {
      setIsLoading(false);
      console.log('Text successfully sent');
    }, 3000);
    // Youngmi look at this for SMS callback
    await SendSMS.send(
      {
        body: 'Sureplus Verification Code e8ce0df77a3abcca0a938d2e499c9daf', // add hash
        recipients: ['1056634352'],
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
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Send us a message
        </Text>
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
        {!isLoading ? (
          <TouchableOpacity
            style={[
              styles.mainButton,
              { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
            ]}
            onPress={_continue}
            activeOpacity={0.7}>
            <Text style={styles.mainButtonText}>Agree and Verify</Text>
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
