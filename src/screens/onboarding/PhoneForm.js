// public imports
import React, { useContext } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';

export default function PhoneForm({ navigation }) {
  const theme = useTheme();

  const { phone, setPhone } = useContext(SignUpContext);

  const _share = () => {
    console.log('share');
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
        <Button title="Send Text" onPress={_share} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.mainButton,
            { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
          ]}
          onPress={() => navigation.navigate('Email')}
          activeOpacity={0.7}>
          <Text style={[styles.mainButtonText, { color: theme.colors.text }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
