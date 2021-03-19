// public imports
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import TouchID from 'react-native-touch-id';

// custom imports
import styles from '../styles/container.styles';
import { PRIMARY_COLOR } from '../styles/constants';

export default function SplashScreen() {
  return (
    <View style={[styles.container, { backgroundColor: PRIMARY_COLOR }]}>
      <Image
        source={require('../assets/images/logo_single.png')}
        style={{ height: 80, width: 80 }}
      />
    </View>
  );
}
