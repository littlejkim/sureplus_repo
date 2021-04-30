/* eslint-disable react-native/no-inline-styles */
// public imports
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';

// custom imports
import { TEXT_REGULAR } from '../styles/fonts';

/* USAGE
params: title, body, mainButton, subButton, cancelButton
*/
export const ThreeButtonModal = (props) => {
  const theme = useTheme();

  const _renderContent = () => {
    return (
      <>
        <View
          style={[
            styles.topContainer,
            { backgroundColor: theme.colors.background },
          ]}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={props.mainButtonAction}
            activeOpacity={0.5}>
            <Text style={[styles.text, { color: theme.colors.title }]}>
              {props.contents.mainButton}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subButton}
            onPress={props.subButtonAction}
            activeOpacity={0.5}>
            <Text style={[styles.text, { color: theme.colors.title }]}>
              {props.contents.subButton}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 8 }}>
          <TouchableOpacity
            style={[
              styles.cancelButton,
              { backgroundColor: theme.colors.background },
            ]}
            onPress={props.hide}
            activeOpacity={0.9}>
            <Text style={styles.cancelButtonText}>
              {props.contents.cancelButton}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <Modal
      style={styles.container}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={props.visible}
      animationInTiming={300}
      animationOutTiming={500}>
      {_renderContent()}
    </Modal>
  );
};

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    marginBottom: Platform.OS === 'ios' ? 50 : 30,
  },
  topContainer: {
    borderRadius: 14,
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: TEXT_REGULAR,
    lineHeight: 22,
    fontWeight: '600',
  },
  mainButton: {
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subButton: {
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ededed',
    borderTopWidth: 1,
  },
  cancelButton: {
    borderRadius: 14,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: TEXT_REGULAR,
  },
});
