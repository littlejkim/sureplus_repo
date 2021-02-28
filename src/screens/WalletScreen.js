// public imports
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/container.styles';

export default function WalletScreen() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.mainText }}>Wallet Screen</Text>
    </View>
  );
}
