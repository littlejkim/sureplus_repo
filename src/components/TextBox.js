// public imports
import React, { forwardRef } from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/welcome.styles';
import { PRIMARY_COLOR } from '../styles/constants';

// bottom modal (need to customize)
export const TextBox = forwardRef(
  ({ changeDate, index, _maxLength, _placeholder }, boxRef) => {
    const theme = useTheme();
    return (
      <View style={styles.dateContainer}>
        <TextInput
          ref={(el) => (boxRef.current[index + 1] = el)}
          keyboardAppearance={theme.dark ? 'dark' : 'light'}
          tintColor={PRIMARY_COLOR}
          fontSize={24}
          width={24 * _maxLength}
          textAlign="center"
          selectionColor={PRIMARY_COLOR}
          keyboardType="number-pad"
          autoFocus={index === 0 ? true : false}
          maxLength={_maxLength}
          placeholder={_placeholder}
          clearTextOnFocus={true}
          lineheight={32}
          onChangeText={(date) => {
            changeDate(index, date);
            date.length === _maxLength
              ? boxRef.current[index + 2].focus()
              : console.log('false');
          }}
        />
      </View>
    );
  },
);
export default TextBox;
