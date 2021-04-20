// public imports
import React from 'react';
import { View, Image } from 'react-native';
import { StyleSheet } from 'react-native';

// custom imports
import { PRIMARY_COLOR } from '../styles/constants';

export default function SplashScreen() {
  return (
    <View style={[styles.container, { backgroundColor: PRIMARY_COLOR }]}>
      <Image
        source={require('../assets/images/logo_single.png')}
        style={{ height: 100, width: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
