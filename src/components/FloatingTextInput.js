// public imports
import React, { useState, useRef } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import { TEXT_REGULAR } from '../styles/fonts';
import { PRIMARY_COLOR } from '../styles/constants.js';

// main modal (need to customize)
export const FloatingTextInput = ({ label, ...props }) => {
  const theme = useTheme();
  const textInputPosition = useRef(new Animated.ValueXY({ x: 0, y: 20 }))
    .current;
  const textSize = useRef(new Animated.Value(24)).current;
  const [isFocused, setIsFocused] = useState(false);
  const _focus = () => {
    setIsFocused(true);

    Animated.parallel([
      Animated.timing(textSize, {
        toValue: 14,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(textInputPosition, {
        toValue: { x: 0, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const _blur = () => {
    setIsFocused(false);
    if (!props.value) {
      Animated.parallel([
        Animated.timing(textSize, {
          toValue: 24,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(textInputPosition, {
          toValue: { x: 0, y: 24 },
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <View
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
        keyboardAppearance={theme.dark ? 'dark' : 'light'}
        ref={props.inputRef}
        style={[
          styles.textInputStyle,
          {
            borderBottomColor: isFocused ? PRIMARY_COLOR : '#EFEFF4',
          },
        ]}
        blurOnSubmit={false}
        autoCorrect={false}
        selectionColor={PRIMARY_COLOR}
        on
        onFocus={_focus}
        onBlur={_blur}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: TEXT_REGULAR,
    position: 'absolute',
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
