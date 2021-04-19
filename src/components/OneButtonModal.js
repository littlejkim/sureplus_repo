// public imports
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';

// custom imports
import { PRIMARY_COLOR } from '../styles/constants';
import { TEXT_REGULAR } from '../styles/fonts';

/* USAGE
params: title, body, mainButton
*/
export const OneButtonModal = (props) => {
  const theme = useTheme();

  return (
    <Modal
      isVisible={props.visible}
      animationIn="fadeIn"
      animationInTiming={250}
      animationOut="fadeOut"
      animationOutTiming={250}>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
        <View style={styles.bodyContainer}>
          <Text style={[styles.title, { color: theme.colors.title }]}>
            {props.contents.title}
          </Text>
          <Text style={[styles.bodyText, { color: theme.colors.title }]}>
            {props.contents.body}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={props.hide}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>{props.contents.mainButton}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    justifyContent: 'space-between',
  },
  title: {
    paddingBottom: 5,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: TEXT_REGULAR,
    lineHeight: 27.32,
    fontWeight: '600',
  },
  bodyText: {
    textAlign: 'center',
    fontFamily: TEXT_REGULAR,
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 23,
  },
  bodyContainer: {
    paddingHorizontal: 32,
    paddingVertical: 25,
  },
  button: {
    height: 58,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
  },
  buttonText: {
    fontFamily: TEXT_REGULAR,
    fontWeight: '600',
    color: 'white',
    lineHeight: 22,
    fontSize: 17,
  },
});