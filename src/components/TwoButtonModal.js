// public imports
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';

// custom imports
import { PRIMARY_COLOR } from '../styles/constants';
import { TEXT_REGULAR } from '../styles/fonts';

/* USAGE
params: title, body, mainButton, subButton
*/
export const TwoButtonModal = (props) => {
  const theme = useTheme();

  const _renderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={props.mainButtonAction}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>{props.contents.mainButton}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subButton}
          onPress={props.subButtonAction}
          activeOpacity={0.7}>
          <Text style={styles.subButtonText}>{props.contents.subButton}</Text>
        </TouchableOpacity>
      </View>
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
    borderTopColor: '#ededed',
    borderTopWidth: 1,
  },
  mainButtonText: {
    color: PRIMARY_COLOR,
    fontFamily: TEXT_REGULAR,
    fontWeight: '600',
    lineHeight: 22,
    fontSize: 17,
  },
  subButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ededed',
    borderTopWidth: 0.3,
  },
  subButtonText: {
    fontFamily: TEXT_REGULAR,
    fontWeight: '400',
    lineHeight: 22,
    fontSize: 17,
  },
});
