// public imports
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/modal.styles.js';
import { TEXT_REGULAR } from '../styles/fonts.js';
import { PRIMARY_COLOR } from '../styles/constants.js';

// main modal (need to customize)
export const FloatingTextInput = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelStyle = {
    fontFamily: TEXT_REGULAR,
    position: 'absolute',
    left: 0,
    top: !isFocused ? 28 : 0,
    fontSize: !isFocused ? 24 : 14,
    color: !isFocused ? '#ACB5BE' : '#ACB5BE',
  };
  return (
    <View style={{ paddingTop: 18 }}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        {...props}
        style={{
          fontFamily: TEXT_REGULAR,
          fontSize: 24,
          borderBottomWidth: 2,
          color: '#000',
          borderBottomColor: PRIMARY_COLOR,
          paddingVertical: 8,
        }}
        selectionColor="white"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};
