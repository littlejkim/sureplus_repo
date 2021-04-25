// public imports
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';

// custom imports
import { TEXT_REGULAR } from '../styles/fonts';

/* USAGE
params: title, body, mainButton, subButton
*/
export const ThreeButtonModal = (props) => {
  const theme = useTheme();
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={250}
      animationOutTiming={250}>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
        <View>
          <TouchableOpacity
            style={styles.topButton}
            onPress={props.continue}
            activeOpacity={0.7}>
            <Text style={[styles.text, { color: theme.colors.title }]}>
              {props.contents.topText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={props.continue}
            activeOpacity={0.7}>
            <Text style={[styles.text, { color: theme.colors.title }]}>
              {props.contents.bottomText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View
          style={[
            styles.cancelContainer,
            { backgroundColor: theme.colors.background },
          ]}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={props.hide}
            activeOpacity={0.7}>
            <Text style={styles.cancelButtonText}>
              {props.contents.subButton}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    justifyContent: 'space-between',
    top: 284,
  },
  cancelContainer: {
    borderRadius: 14,
    justifyContent: 'space-between',
    top: 298,
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: TEXT_REGULAR,
    lineHeight: 22,
    fontWeight: '600',
  },
  topButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ededed',
    borderTopWidth: 0.25,
  },
  cancelButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: TEXT_REGULAR,
    fontWeight: '400',
    color: 'black',
    lineHeight: 22,
    fontSize: 17,
  },
});
