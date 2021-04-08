// public imports
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import { TEXT_REGULAR } from '../styles/fonts';
import { PRIMARY_COLOR } from '../styles/constants.js';

// main modal (need to customize)
export const FloatingTextInput = ({ label, ...props }) => {
  const textInputPosition = useRef(new Animated.ValueXY({ x: 0, y: 20 }))
    .current;
  const textSize = useRef(new Animated.Value(14)).current;
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    if (isFocused) {
      Animated.parallel([
        Animated.timing(textSize, {
          toValue: 14,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.spring(textInputPosition, {
          toValue: { x: 0, y: 0 },
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(textSize, {
          toValue: 24,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.spring(textInputPosition, {
          toValue: { x: 0, y: 24 },
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [textSize, isFocused, textInputPosition, props]);

  return (
    <Animated.View
      style={{
        paddingTop: 18,
      }}>
      <Animated.Text
        style={[
          styles.labelStyle,
          {
            fontSize: textSize,
            transform: [
              {
                translateY: textInputPosition.y,
              },
            ],
          },
        ]}>
        {label}
      </Animated.Text>
      <TextInput
        {...props}
        autoCorrect={false}
        style={[
          styles.textInputStyle,
          {
            borderBottomColor: isFocused ? PRIMARY_COLOR : '#EFEFF4',
          },
        ]}
        selectionColor={PRIMARY_COLOR}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Animated.View>
  );
};

export const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: TEXT_REGULAR,
    position: 'absolute',
    left: 0,
    fontSize: 14,
    color: '#ACB5BE',
  },
  textInputStyle: {
    fontFamily: TEXT_REGULAR,
    fontSize: 24,
    borderBottomWidth: 1.5,
    paddingVertical: 6,
  },
});
