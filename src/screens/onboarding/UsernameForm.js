// public imports
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { ERROR_COLOR, PRIMARY_COLOR } from '../../styles/constants';
import AvailableIcon from '../../assets/images/available.svg';
import ClearButton from '../../assets/images/unavailable.svg';

export default function UsernameForm({ screenHeight }) {
  const theme = useTheme();

  return (
    <View style={{ height: screenHeight }}>
      <Text style={[styles.titleText, { color: theme.colors.title }]}>
        Create username
      </Text>
      <Text style={[styles.bodyText, { color: theme.colors.title }]}>
        Choose a username for your new account. You can always change it later.
      </Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          placeholder="Username"
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
          keyboardType="ascii-capable"
          textContentType="none"
          maxLength={35}
          autoCorrect={false}
          autoFocus={false}
          clearButtonMode="while-editing"
          enablesReturnKeyAutomatically={true}
          blurOnSubmit={true}
          returnKeyType="done"
        />
      </View>
    </View>
  );
}
