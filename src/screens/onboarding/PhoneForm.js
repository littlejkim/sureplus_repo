/* eslint-disable react-native/no-inline-styles */
// public imports
import React, { useContext, useState } from 'react';
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
import { OnboardingContext } from '../../navigation/OnboardingContainer';
import { OneButtonModal } from '../../components/OneButtonModal';

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
  const {
    phone,
    setPhone,
    firstname,
    setFirstname,
    setLastname,
    setInstitutions,
    setEmail,
    setUsername,
    setPassword,
    onboardingCase,
    setOnboardingCase,
  } = useContext(OnboardingContext);
  const [isLoading, setIsLoading] = useState(false);

  // hashing device id
  const hash = CryptoJS.AES.encrypt(
    DeviceInfo.getUniqueId() + 'auth',
    'jioy7A!Y&h9ha90AJkJA872',
  ).toString();

  const _continue = () => {
    setIsLoading(true);
    // bypass SMS auth if virtual device (emulator)

    DeviceInfo.isEmulator().then(async (isEmulator) => {
      setOnboardingCase(0);
      if (onboardingCase !== 0) {
        setPhone('111-111-1111');
        await API.post('twilioapi', '/get/user', {
          body: { phoneNumber: '111-111-1111' },
        }) //p
          .then((res) =>
            res.isTaken
              ? (setFirstname(res.data.firstName),
                setLastname(res.data.lastName),
                setUsername(res.data.userName),
                setEmail(res.data.email))
              : console.log("couldn{'}t bring in data "),
          ) // this value will be boolean
          .catch((err) => console.log('/get/user err: ', err));
      }
      isEmulator ? navigation.navigate('Name') : _sendText();
      // case 1: navigation.navigate('NewUser')
      // case 2: navigation.navigate('ExistingUser')
      // case 3: navigation.navigate('DifferentPhoneNumber')
      // case 4: navigation.navigate('DifferentDeviceId')
      // case 5: navigation.navigate('AccountRecovery')
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
        setIsLoading(false);

        switch (res.statuscode) {
          case 200:
            navigation.navigate('NewUser');
            break;
          case 201:
            navigation.navigate('ExistingUser');
            break;
          case 202:
            navigation.navigate('DifferentPhoneNumber');
            break;
          case 203:
            navigation.navigate('DifferentDeviceId');
            break;
          case 204:
            navigation.navigate('AccountRecovery');
            break;
          case 400:
            //Pop Up Message from res.message, res.title
            break;
          default:
            //Internal Server Error Message, Contact Support -> Very Unlikely but
            break;
        }
      })
      .catch((err) => {
        console.log('/test/sms err: ', err);
        // ERROR MODAL (no response from server)
      });

    //navigation.navigate('Name');
  };

  // not called if run by emulator (virtual device)
  const _sendText = async () => {
    _checkForUser();
    // Youngmi look at this for SMS callback
    await SendSMS.send(
      {
        body: hash, // add hash
        recipients: [twilio_number],
        successTypes: ['sent', 'queued'], // for android
        allowAndroidSendWithoutReadPermission: true, // for android
      },
      (completed, cancelled, error) => {
        // ERROR MODAL (message sending cancelled by user)
      },
    );
  };

  return (
    <>
      <OneButtonModal
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
