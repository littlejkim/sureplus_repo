// public imports
import React from 'react';
import { View, Image } from 'react-native';

// custom imports
import styles from '../styles/container.styles';

export default function SplashScreen() {
  return (
    <View style={[styles.container, { backgroundColor: '#8610EB' }]}>
      <Image
        source={require('../assets/images/logo_long.png')}
        style={{ aspectRatio: 2.5, resizeMode: 'contain' }}
      />
    </View>
  );
}
