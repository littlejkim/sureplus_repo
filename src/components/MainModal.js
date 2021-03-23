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
    <View>
      <Modal
        isVisible={props.visible}
        animationIn="fadeIn"
        animationInTiming={150}
        animationOut="fadeOut"
        animationOutTiming={150}>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}>
          <Text style={[styles.title, { color: theme.colors.title }]}>
            {props.contents.title}
          </Text>
          <Text style={[styles.body, { color: theme.colors.title }]}>
            {props.contents.body}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={props.hide}
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
