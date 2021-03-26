// public imports
import React, { useRef, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';

export default function CompleteForm({ navigation }) {
  const theme = useTheme();
  const {
    phone,
    setPhone,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
  } = useContext(SignUpContext);

  const _continue = () => {
    console.log('next');
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Please check the information you’ve provided.
        </Text>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.labelText}>Full Name</Text>
          <TextInput
            value={firstname + ' ' + lastname}
            keyboardAppearance={theme.dark ? 'dark' : 'light'}
            style={[
              styles.textInput,
              {
                color: theme.colors.mainText,
              },
            ]}
            editable={false}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            value={email}
            keyboardAppearance={theme.dark ? 'dark' : 'light'}
            style={[
              styles.textInput,
              {
                color: theme.colors.mainText,
              },
            ]}
            editable={false}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={styles.labelText}>Phone Number</Text>
          <TextInput
            value={phone}
            keyboardAppearance={theme.dark ? 'dark' : 'light'}
            style={[
              styles.textInput,
              {
                color: theme.colors.mainText,
              },
            ]}
            autoCapitalize="words"
            editable={false}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={styles.labelText}>Username</Text>
          <TextInput
            value={username}
            keyboardAppearance={theme.dark ? 'dark' : 'light'}
            style={[
              styles.textInput,
              {
                color: theme.colors.mainText,
              },
            ]}
            editable={false}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={_continue}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
