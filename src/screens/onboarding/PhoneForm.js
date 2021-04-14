// public imports
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import SendSMS from 'react-native-sms';
import DeviceInfo from 'react-native-device-info';
import remoteConfig from '@react-native-firebase/remote-config';
import { API } from 'aws-amplify';
var CryptoJS = require('crypto-js');

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
import { MainModal } from '../../components/MainModal';

export default function PhoneForm({ navigation }) {
  const theme = useTheme();
  const twilio_number = remoteConfig().getString('twilio_number');

  // error message constants for modal
  const [modal, setModal] = useState(false);
  const contents = {
    title: 'Error',
    body: 'Unsuccessful sending text message to this number. Please try again!',
  };

  // set and get phone number
  const { phone, setPhone } = useContext(SignUpContext);
  const [isLoading, setIsLoading] = useState(false);

  // hashing device id
  const hash = CryptoJS.AES.encrypt(
    DeviceInfo.getUniqueId() + 'auth',
    'jioy7A!Y&h9ha90AJkJA872',
  ).toString();

  const _continue = () => {
    setIsLoading(true);
    // bypass SMS auth if virtual device (emulator)
    DeviceInfo.isEmulator().then((isEmulator) => {
      isEmulator ? navigation.navigate('Name') : _sendText();
    });
  };

  const _checkForUser = async () => {
    // YOUNGMI CHECK
    // 1. pubsub through appsync

    await API.post('twilioapi', '/test/sms', {
      body: { data: 'message' },
    })
      .then((res) => {
        console.log('/test/sms: ', res);
        if (res.statuscode == 200) {
          console.log('move to rest of onboarding');
          // BUZZ
          // setLoading false once this res has been returned
          // check statuscode to see which one has been
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log('/test/sms err: ', err);
      });

    navigation.navigate('Name');
  };

  // not called if run by emulator (virtual device)
  const _sendText = async () => {
    // this is temporary timeout
    // await setTimeout(() => {
    //   setIsLoading(false);
    //   console.log('Text successfully sent');
    // }, 3000);
    _checkForUser();
    // Youngmi look at this for SMS callback
    await SendSMS.send(
      {
        body: hash, // add hash
        recipients: ['+14158180934'],
        successTypes: ['sent', 'queued'], // for android
        allowAndroidSendWithoutReadPermission: true, // for android
      },
      (completed, cancelled, error) => {
        setIsLoading(false);
        completed ? navigation.navigate('Name') : setModal(true);
      },
    );
  };

  return (
    <>
      <MainModal
        visible={modal}
        hide={() => setModal(!modal)}
        contents={contents}
      />
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
    </>
  );
}
