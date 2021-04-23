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
    topText: 'Resend Link',
    bottomText: 'Edit email address',
    subButton: 'Cancel',
  };
  const hide = () => {
    setVisible(false);
  };

  const _continue = () => {
    setVisible(false);
    navigation.navigate('NameForm');
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
        continue={_continue}
        hide={hide}
      />
    </KeyboardAvoidingView>
  );
}
