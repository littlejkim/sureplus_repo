// public imports
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

// custom imports
import styles from '../styles/modal.styles.js';

// main modal (need to customize)
export const MainModal = (props) => {
  return (
    <View>
      <Modal
        isVisible={props.visible}
        animationIn="fadeIn"
        animationInTiming={100}
        animationOut="fadeOut"
        animationOutTiming={100}>
        <View style={styles.container}>
          <Text style={styles.title}>Email sent!</Text>
          <Text style={styles.body}>
            Check your inbox for a verification email from us. If you can't find
            us, please check your spam folder
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
