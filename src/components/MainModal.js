// public imports
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/modal.styles.js';

// main modal (need to customize)
export const MainModal = (props) => {
  const theme = useTheme();

  return (
    <Modal
      isVisible={props.visible}
      animationIn="fadeIn"
      animationInTiming={100}
      animationOut="fadeOut"
      animationOutTiming={100}>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
        <View
          style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 32 }}>
          <Text style={[styles.title, { color: theme.colors.title }]}>
            {props.contents.title}
          </Text>
          <Text style={[styles.body, { color: theme.colors.title }]}>
            {props.contents.body}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={props.hide}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
