// public imports
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/container.styles';

export default function ReportScreen() {
  const { colors, dark } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.mainText }}>Report Screen</Text>
    </View>
  );
}
