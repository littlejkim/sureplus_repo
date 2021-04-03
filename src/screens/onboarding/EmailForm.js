// public imports
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { PRIMARY_COLOR, ERROR_COLOR } from '../../styles/constants';

export default function EmailForm({ screenHeight }) {
  const theme = useTheme();

  return (
    <View style={{ height: screenHeight }}>
      <Text style={[styles.bodyText, { color: '#000000', marginBottom: 52 }]}>
        <Text>Hi </Text>
        <Text style={{ color: PRIMARY_COLOR, fontWeight: '600' }}>
          Jinjae, {'\n'}
        </Text>
        <Text>Please complete your sign up to review your subscriptions!</Text>
      </Text>
      <Text style={[styles.titleText, { color: theme.colors.title }]}>
        What is your email?
      </Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          placeholder="Email"
          keyboardAppearance={theme.dark ? 'dark' : 'light'}
          style={[
            styles.textInput,
            {
              color: theme.colors.mainText,
              borderBottomColor: PRIMARY_COLOR,
            },
          ]}
          autoCapitalize="none"
          selectionColor={PRIMARY_COLOR}
          autoCompleteType="off"
          keyboardType="email-address"
          textContentType="emailAddress"
          maxLength={40}
          autoCorrect={false}
          autoFocus={true}
          clearButtonMode="while-editing"
          enablesReturnKeyAutomatically={true}
          blurOnSubmit={true}
          returnKeyType="next"
        />
      </View>
    </View>
  );
}
