// public imports
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';

export default function PhoneForm() {
  const theme = useTheme();

  const { phone, setPhone } = useContext(SignUpContext);
  const testData = 'hi';

  const _share = () => {
    console.log('share');
  };
  return (
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
  );
}
