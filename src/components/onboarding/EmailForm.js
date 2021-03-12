// public imports
import React, { useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
export function EmailForm() {
  const theme = useTheme();

  const { email, setEmail } = useContext(SignUpContext);

  return (
    <View style={styles.body}>
      <Text
        style={[
          styles.titleText,
          {
            color: theme.colors.mainText,
          },
        ]}>
        Enter email address
      </Text>
      <View
        style={{
          width: '80%',
          marginTop: 30,
        }}>
        <TextInput
          keyboardAppearance={theme.dark ? 'dark' : 'light'}
          style={[styles.textInput, { color: theme.colors.mainText }]}
          autoCapitalize="none"
          selectionColor={theme.colors.mainText}
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          maxLength={320}
          autoCorrect={false}
          autoFocus={true}
          clearButtonMode="while-editing"
          onChangeText={(value) => {
            setEmail(value);
          }}
          textAlign="center"
        />
      </View>
    </View>
  );
}
