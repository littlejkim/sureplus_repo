// public imports
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
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

  const _renderButton = () => {
    return (
      <TouchableOpacity
        style={styles.mainButton}
        onPress={props.hide}
        activeOpacity={0.7}>
        <Text style={styles.mainButtonText}>{props.contents.mainButton}</Text>
      </TouchableOpacity>
    );
  };

  const _renderContent = () => {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.title }]}>
            {props.contents.title}
          </Text>
          <Text style={[styles.bodyText, { color: theme.colors.title }]}>
            {props.contents.body}
          </Text>
        </View>
        {_renderButton()}
      </View>
    );
  };

  return (
    <Modal
      style={{ marginBottom: 0 }}
      isVisible={props.visible}
      animationIn="fadeIn"
      animationInTiming={300}
      animationOut="fadeOut"
      animationOutTiming={300}>
      {_renderContent()}
    </Modal>
  );
};

export const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
  },
  content: {
    paddingHorizontal: 32,
    paddingVertical: 25,
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
    color: 'white',
    textAlign: 'center',
    fontFamily: TEXT_REGULAR,
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 23,
  },
  mainButton: {
    height: 58,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
  },
  mainButtonText: {
    fontFamily: TEXT_REGULAR,
    fontWeight: '600',
    color: 'white',
    lineHeight: 22,
    fontSize: 17,
  },
});
