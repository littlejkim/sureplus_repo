// public imports
import React from 'react';
import { View, Image } from 'react-native';

// custom imports
import styles from '../styles/container.styles';
import { PRIMARY_COLOR } from '../styles/constants';

export default function SplashScreen() {
  return (
    <View style={[styles.container, { backgroundColor: PRIMARY_COLOR }]}>
      <Image
        source={require('../assets/images/logo_long.png')}
        style={{ aspectRatio: 2.5, resizeMode: 'contain' }}
      />
    </View>
  );
}
