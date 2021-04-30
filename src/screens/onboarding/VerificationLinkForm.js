/* eslint-disable react-native/no-inline-styles */
// public imports
import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { PRIMARY_COLOR } from '../../styles/constants';
import { ThreeButtonModal } from '../../components/ThreeButtonModal';

export default function EnterEmailForm({ navigation }) {
  const [visible, setVisible] = useState(false);
  const contents = {
    title: 'Error',
    body: 'Unsuccessful sending text message to this number. Please try again!',
    mainButton: 'Resend Link',
    subButton: 'Edit email address',
    cancelButton: 'Cancel',
  };
  const cancel = () => {
    setVisible(false);
  };
  const resend = () => {
    setVisible(false);
    console.log('resend link');
  };
  const back = () => {
    setVisible(false);
    navigation.navigate('LoginComplete');
  };

  const theme = useTheme();

  const _onPress = () => {
    console.log('welcome Jinje');
    setVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-35}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Verification link sent!
        </Text>
        <Text style={styles.bodyText}>Please check your email.</Text>
      </View>
      <View justifyContent="center" alignItems="center">
        <Image
          source={require('../../assets/images/Verificaiton.png')}
          style={{
            width: '100%',
            resizeMode: 'contain',
            bottom: 194.7,
          }}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.subButton}
          onPress={() => _onPress()}
          activeOpacity={0.5}>
          <Text style={[styles.mainButtonText, { color: PRIMARY_COLOR }]}>
            I didn't recieve my link
          </Text>
        </TouchableOpacity>
      </View>
      <ThreeButtonModal
        visible={visible}
        contents={contents}
        mainButtonAction={resend}
        subButtonAction={back}
        hide={cancel}
      />
    </KeyboardAvoidingView>
  );
}
